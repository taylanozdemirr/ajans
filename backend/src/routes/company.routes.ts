import { Router } from 'express';
import { z } from 'zod';
import { createModel, getMyModels, deleteModel } from '../controllers/company.controller';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/role';
import { upload } from '../middlewares/upload';
import { validate } from '../middlewares/validate';

const router = Router();

const createModelSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'Ad çok kısa'),
    lastName: z.string().min(2, 'Soyad çok kısa'),
    height: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0, 'Boy geçersiz'),
    weight: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0, 'Kilo geçersiz'),
    age: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0, 'Yaş geçersiz'),
    city: z.string().min(2, 'Şehir çok kısa'),
    whatsappPhone: z.string().min(10, 'Telefon çok kısa')
  })
});

router.use(authenticate);
router.use(authorize(['COMPANY']));

router.post('/models', upload.single('photo'), validate(createModelSchema), createModel);
router.get('/models', getMyModels);
router.delete('/models/:id', deleteModel);

export default router;
