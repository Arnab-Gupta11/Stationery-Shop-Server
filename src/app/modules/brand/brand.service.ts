import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
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

export const BrandServices = {
  createBrand,
};
