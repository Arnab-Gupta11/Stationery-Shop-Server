import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';

const router = Router();

// Define routes
router.post(
  '/',
  auth('admin'),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get(
  '/categoryOption',
  auth('admin'),
  CategoryControllers.getALlCategoryOptions,
);

export const CategoryRoutes = router;
