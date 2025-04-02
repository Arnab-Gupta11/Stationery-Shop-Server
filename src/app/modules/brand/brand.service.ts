import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { brandSearchableField } from './brand.constant';
import { IBrand } from './brand.interface';
import Brand from './brand.model';

//Create Brand.
const createBrand = async (brandData: Partial<IBrand>, authUser: IUser) => {
  const brandExist = await Brand.findOne({
    name: brandData.name,
  }).exec();
  if (brandExist) {
    throw new AppError(400, 'Brand with this name already exist.');
  }
  const brand = new Brand({
    ...brandData,
    createdBy: authUser._id,
  });

  const result = await brand.save();

  return result;
};



//Get all brands by admin
const getAllBrandsByAdmin = async (query: Record<string, unknown>) => {
  const BrandQuery = new QueryBuilder(Brand.find({ isActive: true }), query)
    .sort()
    .sortOrder()
    .search(brandSearchableField)
    .paginate();
  const result = await BrandQuery.modelQuery;
  const meta = await BrandQuery.countTotal();

  return {
    result,
    meta,
  };
};

//Get all brands
const getAllBrands = async () => {
  const res = await Brand.find({ isActive: true });
  return res;
};

//Update brand
const updateBrand = async (brandId: string, updatedData: Partial<IBrand>) => {
  const isBrandExist = await Brand.findOne({
    _id: brandId,
    isActive: true,
  });
  if (!isBrandExist) {
    throw new AppError(404, 'The requested brand does not exist');
  }
  const res = await Brand.findByIdAndUpdate(
    brandId,
    { ...updatedData },
    { new: true, runValidators: true },
  );
  return res;
};

//Delete brand
const deleteBrand = async (brandId: string) => {
  const brand = await Brand.findById(brandId);

  if (!brand) {
    throw new AppError(404, 'The requested brand does not exist.');
  }

  // Soft delete by setting isActive to false
  const result = await Brand.findByIdAndUpdate(
    brandId,
    { isActive: false },
    { new: true },
  );

  return result;
};

//Restor deleted brand
const restoreBrand = async (brandId: string) => {
  const brand = await Brand.findById(brandId);

  if (!brand) {
    throw new AppError(404, 'The requested brand does not exist.');
  }
  const result = await Brand.findByIdAndUpdate(
    brandId,
    { isActive: true },
    { new: true },
  );

  return result;
};

export const BrandServices = {
  createBrand,
  getAllBrandsByAdmin,
  getAllBrands,
  updateBrand,
  deleteBrand,
  restoreBrand,
};
