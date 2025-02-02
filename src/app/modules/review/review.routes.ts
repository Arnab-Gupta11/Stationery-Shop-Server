import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth('user'),
    validateRequest(ReviewValidation.createReviewValidationSchema),
    ReviewController.createNewReview,
  );
router
  .route('/:reviewId')
  .patch(
    auth('user'),
    validateRequest(ReviewValidation.updateReviewValidationSchema),
    ReviewController.updateReview,
  )
  .delete(auth('user'), ReviewController.deleteReview);

export const ReviewRoute = router;
