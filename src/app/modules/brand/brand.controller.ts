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

//Get all Brands for admin dashboard
const getALlBrandsByAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.getAllBrandsByAdmin(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived ALl Brands Successfully.',
    data: result,
  });
});

//Get all Brands
const getALlBrands = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.getAllBrands();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived ALl Brands Successfully.',
    data: result,
  });
});

//Update category.
const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const { brandId } = req.params;
  const result = await BrandServices.updateBrand(brandId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Brand updated successfully.',
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
  getALlBrandsByAdmin,
  getALlBrands,
  updateBrand
};
