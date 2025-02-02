/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { IUser } from '../user/user.interface';
import { TReviewPayload } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (user: IUser, payload: TReviewPayload) => {
  // Prepare new review data
  const newReviewData = {
    user: user._id,
    product: payload.product,
    review: payload.review,
    rating: payload.rating,
  };

  // Start a database session for transaction handling
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Check if the user has already submitted a review for this product
    const existingReview = await Review.exists({
      user: user._id,
      product: payload.product,
    }).session(session);

    if (existingReview) {
      throw new AppError(
        400,
        'You have already submitted a review for this product.',
      );
    }

    // Verify if the product exists before proceeding
    const product = await Product.findById(payload.product).session(session);
    if (!product) {
      throw new AppError(404, 'The specified product does not exist.');
    }

    // Transaction 1: Create a new review
    const newReview = await new Review(newReviewData).save({ session });
    if (!newReview) {
      await session.abortTransaction();
      return new AppError(
        500,
        'Failed to create review. Please try again later.',
      );
    }

    // (Revision):=> Transaction 2: Update product rating & total review count
    // 1. Update the total rating and total reviews
    /*     const updatedTotalRating = product.totalRating + payload.rating;
    const updatedTotalReviews = product.totalReviews + 1; */

    // 2. Calculate the new average rating
    /*  const updatedRating = updatedTotalRating / updatedTotalReviews; */

    // 3. Update the product document
    /* product.totalRating = updatedTotalRating;
    product.totalReviews = updatedTotalReviews;
    product.rating = Number(updatedRating.toFixed(1)); */

    //4. saved the data
    /* const savedProduct = await product.save({ session });
    if (!savedProduct) {
      throw new AppError(
        500,
        'Failed to update product rating. Please try again later.',
      );
    } */

    // Transaction 2: Update product rating & total review count. This is the new way to write the code it will handle race condition. when multiple user simuntaneously try to create review. this way will handle inconsistent result.

    //Update Product rating and review count.
    await Product.findByIdAndUpdate(
      payload.product,
      {
        $inc: { totalRating: payload.rating, totalReviews: 1 },
        $set: {
          rating: Number(
            (
              (product.totalRating + payload.rating) /
              (product.totalReviews + 1)
            ).toFixed(1),
          ),
        },
      },
      { session },
    );

    // Commit transaction if everything succeeds
    await session.commitTransaction();
    return newReview;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, error.message || 'An unexpected error occurred.');
  } finally {
    await session.endSession();
  }
};

const updateReviewFromDB = async (
  user: IUser,
  reviewId: string,
  payload: Partial<TReviewPayload>,
) => {
  // Start a database session for transaction handling
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Fetch the review inside the transaction
    const review = await Review.findById(reviewId).session(session);
    if (!review) {
      throw new AppError(404, 'Review not found.');
    }

    // Verify if the product exists inside the transaction
    const product = await Product.findById(review.product).session(session);
    if (!product) {
      throw new AppError(404, 'The specified product does not exist.');
    }

    // Check if the user is authorized to update the review
    if (String(review.user) !== String(user._id)) {
      throw new AppError(403, 'You are not authorized to edit this review.');
    }
    // Transatction-1: Update the review with session
    const updatedReview = await Review.updateOne(
      { _id: reviewId },
      { $set: payload },
      { new: true, runValidators: true, session },
    );

    if (!updatedReview.modifiedCount) {
      throw new AppError(500, 'Failed to update the review.');
    }

    // Calculate the new rating if it is updated
    if (payload.rating !== undefined) {
      const updatedTotalRating =
        product.totalRating - review.rating + payload.rating;
      const updatedRating = updatedTotalRating / product.totalReviews;

      product.totalRating = updatedTotalRating;
      product.rating = Number(updatedRating.toFixed(1));

      // Save product with session
      const savedProduct = await product.save({ session });
      if (!savedProduct) {
        throw new AppError(
          500,
          'Failed to update product rating. Please try again later.',
        );
      }
    }

    // Commit transaction if everything succeeds
    await session.commitTransaction();
    return updatedReview; // Fetch the updated review before returning
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, error.message || 'An unexpected error occurred.');
  } finally {
    session.endSession();
  }
};
const deleteReviewFromDB = async (user: IUser, reviewId: string) => {
  // Start a database session for transaction handling
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Fetch the review inside the transaction
    const review = await Review.findById(reviewId).session(session);
    if (!review) {
      throw new AppError(404, 'Review not found.');
    }

    // Verify if the product exists inside the transaction
    const product = await Product.findById(review.product).session(session);
    if (!product) {
      throw new AppError(404, 'The specified product does not exist.');
    }

    // Check if the user is authorized to update the review
    if (String(review.user) !== String(user._id)) {
      throw new AppError(403, 'You are not authorized to delete this review.');
    }
    // Transatction-1: Update the review with session
    const deletedReview = await Review.deleteOne(
      { _id: reviewId },
      { session },
    );

    if (!deletedReview) {
      throw new AppError(500, 'Failed to update the review.');
    }

    // Calculate the new rating if it is updated

    const updatedTotalRating = product.totalRating - review.rating;
    const updatedRating = updatedTotalRating / (product.totalReviews - 1);
    console.log('updatedTotalRating----->', updatedTotalRating);
    console.log('updatedRating----->', updatedRating);

    product.totalRating = updatedTotalRating;
    product.rating = Number(updatedRating.toFixed(1));
    product.totalReviews = product.totalReviews - 1;

    // Save product with session
    const savedProduct = await product.save({ session });
    if (!savedProduct) {
      throw new AppError(
        500,
        'Failed to update product rating. Please try again later.',
      );
    }

    // Commit transaction if everything succeeds
    await session.commitTransaction();
    return deletedReview; // Fetch the updated review before returning
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, error.message || 'An unexpected error occurred.');
  } finally {
    session.endSession();
  }
};

export default createReviewIntoDB;

export const ReviewServices = {
  createReviewIntoDB,
  updateReviewFromDB,
  deleteReviewFromDB,
};
