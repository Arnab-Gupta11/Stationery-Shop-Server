import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

router.route('/').post(productControllers.createProduct).get();
router
  .route('/:productId')
  .get(productControllers.getSingleProduct)
  .put()
  .delete();

export const ProductRoutes = router;
