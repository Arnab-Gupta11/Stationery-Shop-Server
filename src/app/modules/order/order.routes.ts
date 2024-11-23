import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();

router.route('/').post(orderController.createOrder);
router.route('/revenue').get(orderController.getTotalRevenue);

export const OrderRoutes = router;
