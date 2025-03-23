import { Router } from 'express';
import { categoryController } from './category.controller';

const router = Router();

// Define routes
router.get('/', categoryController.getAll);

export default router;
