import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

//Save product into database.
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};
//Get all product from database.
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .sortOrder()
    .paginate();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};
//Get single product from database.
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
//Update product into database.
const updateProductIntoDB = async (id: string, updates: object) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true },
  );
  return result;
};
//Delete product from database.
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
