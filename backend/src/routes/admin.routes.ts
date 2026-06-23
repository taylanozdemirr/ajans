import { Router } from 'express';
import { z } from 'zod';
import { createCompany, getCompanies, deleteCompany, updateCompanyLimit } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/role';
import { validate } from '../middlewares/validate';

const router = Router();

const createCompanySchema = z.object({
  body: z.object({
    email: z.string().email('Geçerli e-posta girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
    name: z.string().min(2, 'Firma adı çok kısa'),
    totalLimit: z.number().int().positive('Limit pozitif olmalı')
  })
});

const updateLimitSchema = z.object({
  body: z.object({
    totalLimit: z.number().int().positive('Limit pozitif olmalı')
  }),
  params: z.object({
    id: z.string().uuid('Geçersiz ID formatı')
  })
});

router.use(authenticate);
router.use(authorize(['ADMIN']));

router.post('/companies', validate(createCompanySchema), createCompany);
router.get('/companies', getCompanies);
router.delete('/companies/:id', deleteCompany);
router.patch('/companies/:id/limit', validate(updateLimitSchema), updateCompanyLimit);

export default router;
