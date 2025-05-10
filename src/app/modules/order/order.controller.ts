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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders(req.query);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'All Orders retrived successfully',
      statusCode: 200,
      meta: result.meta,
      data: result.result,
    });
  }
});
const getAllOrdersOfAUser = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getSingleUserAllOrders(req.user, req.query);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'All Orders retrived successfully',
      statusCode: 200,
      meta: result.meta,
      data: result.result,
    });
  }
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const updates = req.body;
  const { orderId } = req.params;
  const result = await orderService.updateOrderStatusIntoDB(orderId, updates);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Order Status updated successfully',
      statusCode: 200,
      data: result,
    });
  }
});

export const orderController = {
  getAllOrders,
  createOrder,
  verifyPayment,
  updateOrderStatus,
  getAllOrdersOfAUser,
};
