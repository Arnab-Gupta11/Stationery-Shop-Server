import express from 'express';
import { productControllers } from './product.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

//Routes for handling product related operation.
router
  .route('/')
  .post(auth('admin'), productControllers.createProduct)
  .get(productControllers.getALlProducts);
router.get(
  '/deleted-products',
  auth('admin'),
  productControllers.getALlDeletedProducts,
);

// router.route('/maxPrice').get(productControllers.getMaximumPrice);

router
  .route('/:productId')
  .put(auth('admin'), productControllers.updateProduct)
  .delete(auth('admin'), productControllers.deleteProduct)
  .get(productControllers.getProductDetails);
// Restore a deleted product
router.put(
  '/:productId/restore',
  auth('admin'),
  productControllers.restoreProduct,
);
export const ProductRoutes = router;
