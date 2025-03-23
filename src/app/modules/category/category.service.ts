import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (
  categoryData: Partial<ICategory>,
  authUser: IUser,
) => {
  const categoryExist = await Category.findOne({
    name: categoryData.name,
  }).exec();
  if (categoryExist) {
    throw new AppError(400, 'Category with this name already exist.');
  }
  const category = new Category({
    ...categoryData,
    createdBy: authUser._id,
  });

  const result = await category.save();

  return result;
};

export const CategoryServices = {
  createCategory,
};
