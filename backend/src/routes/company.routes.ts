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
    whatsappPhone: z.string().min(10, 'Telefon çok kısa')
  })
});

router.use(authenticate);
router.use(authorize(['COMPANY']));

router.post('/models', upload.array('photos', 10), validate(createModelSchema), createModel);
router.get('/models', getMyModels);
router.delete('/models/:id', deleteModel);

export default router;
