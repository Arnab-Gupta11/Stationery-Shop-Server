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
  const maxPriceData = await Product.findOne()
    .sort({ price: -1 })
    .select('price')
    .exec();
  const maxProductPrice = maxPriceData?.price || 0;
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .filterByPrice(maxProductPrice)
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
const getMaximumPriceFromDB = async () => {
  // Find the product with the highest price by sorting in descending order
  const product = await Product.findOne()
    .sort({ price: -1 })
    .select('price')
    .lean();

  // Return the price if a product is found, otherwise null
  return product?.price || null;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getMaximumPriceFromDB,
};
