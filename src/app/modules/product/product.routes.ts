import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

//Routes for handling product related operation.
router
  .route('/')
  .post(productControllers.createProduct)
  .get(productControllers.getAllProducts);

router.route('/maxPrice').get(productControllers.getMaximumPrice);

router
  .route('/:productId')
  .get(productControllers.getSingleProduct)
  .put(productControllers.updateProduct)
  .delete(productControllers.deleteProduct);

export const ProductRoutes = router;
