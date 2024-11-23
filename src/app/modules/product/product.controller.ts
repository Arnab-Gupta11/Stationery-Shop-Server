import { Request, Response } from 'express';
import { productServices } from './product.services';

//creating a new product.
const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    const result = await productServices.createProductIntoDB(newProduct);
    if (result) {
      res.status(201).json({
        message: 'Product created successfully',
        success: true,
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
//get single product.
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    if (!result) {
      res.status(404).json({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occured while retriving the product',
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
//get all product.
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { name: searchTerm },
          { brand: searchTerm },
          { category: searchTerm },
        ],
      };
    }
    const result = await productServices.getAllProductFromDB(query);
    //If no product found after querying using searchTerm.
    if (result.length === 0 && searchTerm) {
      res.status(404).json({
        message: 'Resource not found',
        success: false,
        error: {
          name: 'NotFoundError',
          message: `No Product found matching the search term ${searchTerm}`,
          path: 'searchTerm',
          value: searchTerm,
        },
        stack: new Error().stack,
      });
    } else {
      res.status(200).json({
        message: 'Products retrieved successfully',
        status: true,
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occured while retriving  products',
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
//update product.
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const { productId } = req.params;
    const result = await productServices.updateProductIntoDB(
      productId,
      updates,
    );
    //If no product found for updating.
    if (!result) {
      res.status(404).json({
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
      res.status(500).json({
        message: 'An error occured while Updating the product',
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
//delete product.
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    //If no product found.
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occured while deleting the product',
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
export const productControllers = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
