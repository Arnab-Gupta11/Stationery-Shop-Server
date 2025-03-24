import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';

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
  // const categoryQuery = new QueryBuilder(
  //   Category.find({ isActive: true }),
  //   query,
  // )
  //   .search(categorySearchableField)
  //   .filter()
  //   .sort()
  //   .paginate();
  // const categories = await categoryQuery.modelQuery;
  // const meta = await categoryQuery.countTotal();
  // const categoryMap = new Map<string, any>();
  // const hirerchy=[];
  // categories.forEach((category:ICategory)=>{
  //    categoryMap.set(category._id.toString(),{...category,})
  // })

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

export const CategoryServices = {
  createCategory,
  getAllCategoriesOption,
};
