import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';
import sendResponse from '../../utils/sendResponse';

//Create category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategory(req.body, req.user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created  successfully.',
    data: result,
  });
});

//Get category option
const getALlCategoryOptions = catchAsync(
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
const getALlCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived ALl Categories Successfully.',
    data: result,
  });
});
//Get All  SubCategories
const getALlSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllSubCategories();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived ALl Sub-Categories Successfully.',
    data: result,
  });
});
//Get All  SubCategories of a category.
const getALlSubCategoryOfACategory = catchAsync(
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
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.updateCategory(categoryId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully.',
    data: result,
  });
});
//Delete category.
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.deleteCategory(categoryId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully.',
    data: result,
  });
});
//Restore category.
const restoreCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.restoreCategory(categoryId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category has been successfully restored.',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getALlCategoryOptions,
  getALlCategory,
  getALlSubCategory,
  getALlSubCategoryOfACategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
};
