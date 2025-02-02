import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

//creating a new review.
const createNewReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReviewIntoDB(req.user, req.body);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Review submitted successfully! Thank you for your feedback.',
      statusCode: 201,
      data: result,
    });
  }
});
//Updating Review.
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.updateReviewFromDB(
    req.user,
    reviewId,
    req.body,
  );
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Your review has been updated successfully!',
      statusCode: 200,
      data: result,
    });
  }
});
// Delete Review
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.deleteReviewFromDB(req.user, reviewId);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Your review has been deleted successfully!',
      statusCode: 200,
      data: result,
    });
  }
});

//Get all review
const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ReviewServices.getAllReviewFromDB(req.user, productId);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'All review retrived successfully!',
      statusCode: 200,
      data: result,
    });
  }
});
//Get all review
const getReviewDetails = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await ReviewServices.getReviewDetailsFromDB(reviewId);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'Review retrived successfully!',
      statusCode: 200,
      data: result,
    });
  }
});

export const ReviewController = {
  createNewReview,
  updateReview,
  deleteReview,
  getAllReview,
  getReviewDetails,
};
