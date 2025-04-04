import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { productServices } from './product.services';
import sendResponse from '../../utils/sendResponse';

//creating a new product.
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct = req.body;
  const result = await productServices.createProduct(newProduct);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Product created successfully',
      statusCode: 201,
      data: result,
    });
  }
});

//update product.
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updates = req.body;
  const { productId } = req.params;
  const result = await productServices.updateProduct(productId, updates);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Product is updated successfully',
      statusCode: 200,
      data: result,
    });
  }
});

//get single product.
// const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
//   const { productId } = req.params;
//   const result = await productServices.getSingleProductFromDB(productId);
//   if (result) {
//     sendResponse(res, {
//       success: true,
//       message: 'Product is retrieved successfully',
//       statusCode: 201,
//       data: result,
//     });
//   }
// });

//get all product.
// const getAllProducts = catchAsync(async (req: Request, res: Response) => {
//   const result = await productServices.getAllProductFromDB(req.query);
//   if (result) {
//     sendResponse(res, {
//       success: true,
//       message: 'Retrieved all product successfully',
//       statusCode: 200,
//       meta: result.meta,
//       data: result.result,
//     });
//   }
// });

//delete product.
// const deleteProduct = catchAsync(async (req: Request, res: Response) => {
//   const { productId } = req.params;
//   const result = await productServices.deleteProductFromDB(productId);
//   //If no product found.
//   if (result) {
//     sendResponse(res, {
//       success: true,
//       message: 'Product is deleted successfully',
//       statusCode: 201,
//       data: result,
//     });
//   }
// });
export const productControllers = {
  createProduct,
  updateProduct,
};
