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
//Get Proper Details.
const getProductDetails = catchAsync(async (req: Request, res: Response) => {
  const { identifier } = req.params;
  const result = await productServices.getProdactDetails(identifier);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived product details successfully.',
    data: result,
  });
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

//Get all products
const getALlProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived all products successfully.',
    meta: result.meta,
    data: result.result,
  });
});
//delete product.
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productServices.deleteProduct(productId);
  //If no product found.

  sendResponse(res, {
    success: true,
    message: 'Product is deleted successfully',
    statusCode: 200,
    data: result,
  });
});
//Get all deleted products
const getALlDeletedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getAllDeletedProducts(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived ALl deleted products Successfully.',
      meta: result.meta,
      data: result.result,
    });
  },
);

//Restore product.
const restoreProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productServices.restoreProduct(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product has been successfully restored.',
    data: result,
  });
});

//Get all trending products
const getAllTrendingProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getAllTrendingProducts();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrived all trending products successfully.',
      data: result,
    });
  },
);

//Get top rated products
const getTopRatedProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getTopRatedProducts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrived top rated products successfully.',
    data: result,
  });
});
//Update Fetured product status
const updateFeaturedProductStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const result =
      await productServices.updateFeaturedProductStatusIntoDB(productId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Product Status Updated Successfully.',
      data: result,
    });
  },
);

//Get all featured products.
const getAllFeturedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getAllFeaturedProductFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Featured Products fetched successfully',
      data: result,
    });
  },
);

//Get all products of a category.
const getAllProductsOfACategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await productServices.getAllProductsOfACategory(
      id,
      req.query,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All Products of a category fetched successfully',
      meta: result.meta,
      data: result.result,
    });
  },
);

export const productControllers = {
  createProduct,
  updateProduct,
  deleteProduct,
  getALlProducts,
  getProductDetails,
  getALlDeletedProducts,
  restoreProduct,
  getAllTrendingProducts,
  getTopRatedProducts,
  updateFeaturedProductStatus,
  getAllFeturedProducts,
  getAllProductsOfACategory,
};
