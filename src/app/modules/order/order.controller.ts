import { Request, Response } from 'express';
import { orderService } from './order.services';
import sendResponse from '../../utils/sendResponse';

//Creat a new Order.
const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await orderService.createNewOrderIntoDB(orderData);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Order created successfully',
      statusCode: 201,
      data: result,
    });
  }
};

//Get total revenue.
const getTotalRevenue = async (req: Request, res: Response) => {
    const totalRevenue = await orderService.calulateRevenue();
    sendResponse(res, {
      success: true,
      message: 'Revenue calculated successfully',
      statusCode: 200,
      data: totalRevenue,
    });
};
export const orderController = {
  createOrder,
  getTotalRevenue,
};
