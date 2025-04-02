import { Router } from 'express';
import { CategoryControllers } from './category.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';

const router = Router();

// Create a new category (Only Admin)
router.post(
  '/',
  auth('admin'),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

// Get all categories (Parent & Subcategories)
router.get('/', CategoryControllers.getALlCategory);

// Get only subcategories
router.get('/subcategories', CategoryControllers.getALlSubCategory);

// Get category options (possibly for dropdowns or UI selection)
router.get('/options', CategoryControllers.getALlCategoryOptions);

// Get all subcategories of a specific category
router.get(
  '/:parentId/subcategories',
  CategoryControllers.getALlSubCategoryOfACategory,
);

// Update category by ID
router.put(
  '/:categoryId',
  auth('admin'),
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

// Soft delete category by ID
router.delete(
  '/:categoryId',
  auth('admin'),
  CategoryControllers.deleteCategory,
);

// 🔹 Restore a deleted category
router.put(
  '/:categoryId/restore',
  auth('admin'),
  CategoryControllers.restoreCategory,
);

export const CategoryRoutes = router;
