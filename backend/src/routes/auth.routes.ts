import { Router } from 'express';
import { z } from 'zod';
import { login } from '../controllers/auth.controller';
import { authLimiter } from '../middlewares/rateLimiter';
import { validate } from '../middlewares/validate';

const router = Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
  })
});

router.post('/login', authLimiter, validate(loginSchema), login);

export default router;
