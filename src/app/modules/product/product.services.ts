import AppError from '../../errors/AppError';
import Brand from '../brand/brand.model';
import { Category } from '../category/category.model';
import { IProduct } from './product.interface';
import Product from './product.model';

// Create a product
export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  if (!productData.category) {
    throw new AppError(400, 'Category ID is required');
  }
  if (!productData.brand) {
    throw new AppError(400, 'Brand ID is required');
  }
  const [category, brand] = await Promise.all([
    Category.findOne({
      _id: productData.category,
      isActive: true,
    }),
    Brand.findOne({
      _id: productData.brand,
      isActive: true,
    }),
  ]);

  if (!category) {
    throw new AppError(404, 'Category not found');
  }
  if (!brand) {
    throw new AppError(404, 'Brand not found');
  }
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

export const productServices = {
  createProduct,
};
