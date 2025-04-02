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
router.get('/', BrandControllers.getALlBrands);
router.get('/admin', auth('admin'), BrandControllers.getALlBrandsByAdmin);
router.get('/:brandId', BrandControllers.getBrandDetails);

// Update brand by ID
router.put(
  '/:brandId',
  auth('admin'),
  validateRequest(BrandValidations.updateBrandValidationSchema),
  BrandControllers.updateBrand,
);
// Delete brand by ID
router.delete('/:brandId', auth('admin'), BrandControllers.deleteBrand);

// Restore a deleted brand
router.put('/:brandId/restore', auth('admin'), BrandControllers.restoreBrand);

export const BrandRoutes = router;
