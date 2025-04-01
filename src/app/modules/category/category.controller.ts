import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';
import sendResponse from '../../utils/sendResponse';

//Create category
export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.createCategory(req.body, req.user);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Create Category Successfully.',
      data: result,
    });
  },
);

//Get category option
export const getALlCategoryOptions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategoriesOption();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived ALl Categories Successfully.',
      data: result,
    });
  },
);

//const getAllCategories
export const getALlCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategories(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived ALl Categories Successfully.',
      data: result,
    });
  },
);

export const CategoryControllers = {
  createCategory,
  getALlCategoryOptions,
  getALlCategory
};
