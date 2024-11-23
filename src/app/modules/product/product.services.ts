import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};
const getAllProductFromDB = async (queary: object) => {
  const result = await Product.find(queary);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, updates: object) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true },
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
// const updateProductIntoDB=async(id:string,updatedData:object)

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
