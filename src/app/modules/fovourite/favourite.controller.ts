import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FavouriteServices } from './favourite.service';
import sendResponse from '../../utils/sendResponse';

const addToFavourite = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.body;
  const result = await FavouriteServices.addToFavourite(req.user, productId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product added to your wishlist.',
    data: result,
  });
});
const getAllFavourites = catchAsync(async (req: Request, res: Response) => {
  const result = await FavouriteServices.getAllFavourites(req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch all product from your wishlist.',
    data: result,
  });
});
const removeFromFavourite = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.body;
  const result = await FavouriteServices.removeFromFavourite(
    req.user,
    productId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product removed From your wishlist.',
    data: result,
  });
});

export const FavouriteControllers = {
  addToFavourite,
  removeFromFavourite,
  getAllFavourites,
};
