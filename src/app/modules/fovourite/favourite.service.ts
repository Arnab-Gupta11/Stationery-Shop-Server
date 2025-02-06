import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Favourite } from './favourite.model';

const addToFavourite = async (user: IUser, productId: string) => {
  const isUserExist = await User.exists(user._id);
  if (!isUserExist) {
    throw new AppError(
      404,
      'Login to your account.To add the product in Your wishlist.',
    );
  }

  const result = Favourite.findOneAndUpdate(
    { userId: user._id },
    { $addToSet: { products: productId } },
    { upsert: true, new: true },
  );
  return result;
};
const removeFromFavourite = async (user: IUser, productId: string) => {
  const isUserExist = await User.exists(user._id);
  if (!isUserExist) {
    throw new AppError(
      404,
      'Login to your account.To add the product in Your wishlist.',
    );
  }

  const result = Favourite.findOneAndUpdate(
    { userId: user._id },
    { $pull: { products: productId } },
  );
  return result;
};
const getAllFavourites = async (user: IUser) => {
  const result = await Favourite.findOne({ userId: user._id });
  return result;
};

export const FavouriteServices = {
  addToFavourite,
  removeFromFavourite,
  getAllFavourites,
};
