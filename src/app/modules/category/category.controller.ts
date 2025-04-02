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

//Get All Categories
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
//Get All  SubCategories
export const getALlSubCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategories(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived ALl Sub-Categories Successfully.',
      data: result,
    });
  },
);
//Get All  SubCategories of a category.
export const getALlSubCategoryOfACategory = catchAsync(
  async (req: Request, res: Response) => {
    const { parentId } = req.params;
    const result =
      await CategoryServices.getAllSubCategoryOfACategory(parentId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived ALl Sub-Categories Successfully.',
      data: result,
    });
  },
);
//Update category.
export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const result = await CategoryServices.updateCategory(categoryId, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Category updated successfully.',
      data: result,
    });
  },
);

export const CategoryControllers = {
  createCategory,
  getALlCategoryOptions,
  getALlCategory,
  getALlSubCategory,
  getALlSubCategoryOfACategory,
  updateCategory
};
