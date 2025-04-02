import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BrandServices } from './brand.service';
import sendResponse from '../../utils/sendResponse';

//Create category
const createBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.createBrand(req.body, req.user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Brand created successfully.',
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
};
