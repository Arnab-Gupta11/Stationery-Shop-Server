import { Request, Response } from 'express';
import { orderService } from './order.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

//Creat a new Order.
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await orderService.createNewOrderIntoDB(
    req.body,
    user,
    req.ip!,
  );
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Order created successfully',
      statusCode: 201,
      data: result,
    });
  }
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
  });
});

//Get total revenue.
// const getTotalRevenue = async (req: Request, res: Response) => {
//   const totalRevenue = await orderService.calulateRevenue();
//   sendResponse(res, {
//     success: true,
//     message: 'Revenue calculated successfully',
//     statusCode: 200,
//     data: totalRevenue,
//   });
// };
export const orderController = {
  createOrder,
  verifyPayment
};
