import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

//Routes for handling Order related operation.
router.route('/').post(auth('user'), orderController.createOrder);
router.get('/verify', auth('user'), orderController.verifyPayment);

export const OrderRoutes = router;
