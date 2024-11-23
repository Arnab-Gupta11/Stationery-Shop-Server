import { Request, Response } from 'express';
import { orderService } from './order.services';

//Creat a new Order.
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await orderService.createNewOrderIntoDB(orderData);
    if (result) {
      res.status(200).json({
        message: 'Order created successfully',
        status: true,
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: err.name,
          errors: err.errors,
        },
        stack: err.stack,
      });
    } else {
      res.status(err.statusCode || 500).json({
        message:
          err.displayMessage || 'An error occured while creating the order',
        success: false,
        error: {
          name: err.name || 'InternalError',
          errors: {
            general: {
              message: err.message || 'unexpected error occured',
              name: err.name || 'InternalError',
              path: err.path || 'general',
              value: err.value || '',
            },
          },
        },
        stack: err.stack,
      });
    }
  }
};

//Get total revenue.
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calulateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occured while calculating the total revenue',
      success: false,
      error: {
        name: err.name || 'InternalError',
        errors: {
          general: {
            message: err.message || 'unexpected error occured',
            name: err.name || 'InternalError',
            path: 'general',
          },
        },
      },
      stack: err.stack,
    });
  }
};
export const orderController = {
  createOrder,
  getTotalRevenue,
};
