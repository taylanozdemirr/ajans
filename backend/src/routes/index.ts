import { Router } from 'express';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes';
import companyRoutes from './company.routes';
import publicRoutes from './public.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/company', companyRoutes);
router.use('/public', publicRoutes);

export default router;
