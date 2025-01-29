import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const getUserById = async (userId: string, loginUser: IUser) => {
  const user = await User.findById(userId).select('-password');
  if (loginUser.email !== user?.email) {
    throw new AppError(400, 'You are not authorized');
  }
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
const getAllUsers = async () => {
  const result = await User.find().select('-password'); // Exclude password field
  return result;
};
const updateUser = async (
  userId: string,
  updateData: Partial<IUser>,
  loginUser: IUser,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (loginUser.role === 'user' && loginUser.email !== user.email) {
    throw new AppError(400, 'You are not authorized');
  }
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  return updatedUser;
};

export const UserServices = {
  getUserById,
  getAllUsers,
  updateUser,
};
