import QueryBuilder from '../../builder/QueryBuilder';
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
const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(
    User.find({ role: { $ne: 'admin' } }, '-password').sort({ createdAt: -1 }),
    query,
  ).paginate();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
  // const result = await User.find({ role: { $ne: 'admin' } }).select(
  //   '-password',
  // );
  // return result;
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

const updateUserStatusIntoDB = async (id: string, updates: object) => {
  const result = await User.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true },
  );
  return result;
};

export const UserServices = {
  getUserById,
  getAllUsers,
  updateUser,
  updateUserStatusIntoDB,
};
