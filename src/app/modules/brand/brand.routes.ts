import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValidations } from './brand.validation';
import { BrandControllers } from './brand.controller';

const router = Router();

// Create a new category (Only Admin)
router.post(
  '/',
  auth('admin'),
  validateRequest(BrandValidations.createBrandValidationSchema),
  BrandControllers.createBrand,
);

export const BrandRoutes = router;
