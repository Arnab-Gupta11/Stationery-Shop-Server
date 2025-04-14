import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import Brand from '../brand/brand.model';
import { Category } from '../category/category.model';
import { productSearchableFields } from './product.constant';
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
//Get all products
const getAllProducts = async (query: Record<string, unknown>) => {
  const ProductQuery = new QueryBuilder(
    Product.find({ isActive: true }).populate('category').populate('brand'),
    query,
  )
    .sort()
    .sortOrder()
    .filter()
    .filterByPrice(100000000)
    .search(productSearchableFields)
    .paginate();
  const result = await ProductQuery.modelQuery;
  const meta = await ProductQuery.countTotal();

  return {
    result,
    meta,
  };
};

//Get Brand Details
const getProdactDetails = async (productId: string) => {
  const result = await Product.findOne({
    _id: productId,
    isActive: true,
  })
    .populate('category')
    .populate('brand');
  if (!result) {
    throw new AppError(404, 'The requested product does not exist');
  }
  return result;
};

//Update Product.
const updateProduct = async (
  productId: string,
  updatedData: Partial<IProduct>,
) => {
  const isProductExist = await Product.findOne({
    _id: productId,
    isActive: true,
  });
  if (!isProductExist) {
    throw new AppError(404, 'The requested product does not exist');
  }
  const res = await Product.findByIdAndUpdate(
    productId,
    { ...updatedData },
    { new: true, runValidators: true },
  );
  return res;
};

//Delete product
const deleteProduct = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, 'The requested product does not exist.');
  }

  // Soft delete by setting isActive to false
  const result = await Brand.findByIdAndUpdate(
    productId,
    { isActive: false },
    { new: true },
  );
  return result;
};

export const productServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProdactDetails,
};
