import { Router } from 'express';
import { getAllModels } from '../controllers/public.controller';

const router = Router();

router.get('/models', getAllModels);

export default router;
