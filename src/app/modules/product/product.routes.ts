import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

router
  .route('/')
  .post(productControllers.createProduct)
  .get(productControllers.getAllProducts);
router
  .route('/:productId')
  .get(productControllers.getSingleProduct)
  .put(productControllers.updateProduct)
  .delete();

export const ProductRoutes = router;
