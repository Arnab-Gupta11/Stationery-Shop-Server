import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { categorySearchableField } from './category.constant';

import { ICategory } from './category.interface';
import { Category } from './category.model';

//Create Category.
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

//Get All Category.
const getAllCategoriesOption = async () => {
  const result = await Category.aggregate([
    {
      $match: {
        parent: null,
        isActive: true,
      },
    },
    {
      $graphLookup: {
        from: 'categories',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parent',
        as: 'subcategory',
        restrictSearchWithMatch: {
          isActive: true,
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        icon: 1,
        subcategory: {
          _id: 1,
          name: 1,
          icon: 1,
        },
      },
    },
  ]);
  return result;
};

const getAllCategories = async (query: Record<string, unknown>) => {
  const CategoryQuery = new QueryBuilder(
    Category.find({ isActive: true }),
    query,
  )
    .sort()
    .sortOrder()
    .search(categorySearchableField)
    .paginate();
  const result = await CategoryQuery.modelQuery;
  const meta = await CategoryQuery.countTotal();

  return {
    result,
    meta,
  };
};

//Get all sub-categories
const getAllSubCategories = async () => {
  const res = await Category.find({ isActive: true, parent: { $ne: null } });
  return res;
};

//Get all sub-categories of a category.
const getAllSubCategoryOfACategory = async (parentId: string) => {
  const isParentCategoryExist = await Category.findOne({
    isActive: true,
    _id: parentId,
  });
  if (!isParentCategoryExist) {
    throw new AppError(404, "Parent Category doesn't exist.");
  }
  const res = await Category.find({ isActive: true, parent: parentId });
  return res;
};

//Update Category
const updateCategory = async (
  categoryId: string,
  updatedData: Partial<ICategory>,
) => {
  const isCategoryExist = await Category.findOne({
    _id: categoryId,
    isActive: true,
  });
  if (!isCategoryExist) {
    throw new AppError(404, 'The requested category does not exist');
  }
  const res = await Category.findByIdAndUpdate(
    categoryId,
    { ...updatedData },
    { new: true, runValidators: true },
  );
  return res;
};

export const CategoryServices = {
  createCategory,
  getAllCategoriesOption,
  getAllCategories,
  getAllSubCategories,
  getAllSubCategoryOfACategory,
  updateCategory,
};
