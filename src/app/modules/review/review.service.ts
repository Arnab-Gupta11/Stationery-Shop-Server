import { IUser } from '../user/user.interface';
import { TReviewPayload } from './review.interface';

const creatReviewIntoDB = (user: IUser, payload: TReviewPayload) => {
  const newReviewData = {
    user: user._id,
    product: payload.product,
    comment: payload.comment,
    rating: payload.rating,
  };
};
