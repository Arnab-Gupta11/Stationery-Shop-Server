import { Request, Response } from 'express';
import { productServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const result = await productServices.createProductIntoDB(newProduct);
    if (result) {
      res.status(200).json({
        message: 'Product created successfully',
        success: true,
        data: result,
      });
    }
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
      res.status(500).json({
        message: 'An error occured while creating the product',
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
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    if (!result) {
      res.status(400).json({
        message: 'Resource not found',
        success: false,
        error: {
          name: 'NotFoundError',
          message: `Product with ID ${productId} does not exist.`,
          path: 'productId',
          value: productId,
        },
        stack: new Error().stack,
      });
    } else {
      res.status(200).json({
        message: 'Product retrieved successfully',
        status: true,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occured while creating the product',
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
const getAllProducts = async (req: Request, res: Response) => {
  console.log(req.query);
  const result = await productServices.getAllProductFromDB(req.query);
  res.status(200).json({
    data: result,
  });
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const { productId } = req.params;
    const result = await productServices.updateProductIntoDB(
      productId,
      updates,
    );
    if (!result) {
      res.status(400).json({
        message: 'Resource not found',
        success: false,
        error: {
          name: 'NotFoundError',
          message: `Product with ID ${productId} does not exist.`,
          path: 'productId',
          value: productId,
        },
        stack: new Error().stack,
      });
    } else {
      res.status(200).json({
        message: 'Product updated successfully',
        status: true,
        data: result,
      });
    }
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
      res.status(500).json({
        message: 'An error occured while creating the product',
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
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productServices.deleteProductFromDB(productId);
  if (!result) {
    res.status(400).json({
      message: 'Resource not found',
      success: false,
      error: {
        name: 'NotFoundError',
        message: `Product with ID ${productId} does not exist.`,
        path: 'productId',
        value: productId,
      },
      stack: new Error().stack,
    });
  } else {
    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: {},
    });
  }
};
export const productControllers = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
