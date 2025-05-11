/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
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

//Get Product Details
const getProdactDetails = async (identifier: string) => {
  const validId = mongoose.Types.ObjectId.isValid(identifier);
  const query: any = {
    $or: [{ slug: identifier }],
    isActive: true,
  };

  if (validId) {
    query.$or.push({ _id: identifier });
  }
  const result = await Product.findOne(query)
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
  const result = await Product.findByIdAndUpdate(
    productId,
    { isActive: false },
    { new: true },
  );
  return result;
};

//Get all deleted products.
const getAllDeletedProducts = async (query: Record<string, unknown>) => {
  const PoductQuery = new QueryBuilder(
    Product.find({ isActive: false }).populate('category').populate('brand'),
    query,
  )
    .sort()
    .sortOrder()
    .search(productSearchableFields)
    .paginate();
  const result = await PoductQuery.modelQuery;
  const meta = await PoductQuery.countTotal();

  return {
    result,
    meta,
  };
};

//Restore deleted products
const restoreProduct = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, 'The requested product does not exist.');
  }
  const result = await Product.findByIdAndUpdate(
    productId,
    { isActive: true },
    { new: true },
  );

  return result;
};

//Get all trending products
const getAllTrendingProducts = async () => {
  const result = Product.find({
    salesCount: { $gt: 0 },
    inStock: true,
    isActive: true,
  })
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'brand', select: 'name' })
    .sort({ salesCount: -1 })
    .limit(6);
  return result;
};

//get top rated products
const getTopRatedProducts = async () => {
  const result = Product.find({
    rating: { $gt: 3 },
    inStock: true,
    isActive: true,
  })
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'brand', select: 'name' })
    .sort({ rating: -1, totalReviews: -1 })
    .limit(6);
  return result;
};

//Update fetured product status
const updateFeaturedProductStatusIntoDB = async (id: string) => {
  // Find the project first
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  // Toggle the `isFeatured` value
  const updatedFeaturedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: { isFeatured: !product.isFeatured } }, // Properly toggles the boolean value
    { new: true, runValidators: true },
  );

  return updatedFeaturedProduct;
};

//Get All Featured Product from db
const getAllFeaturedProductFromDB = async () => {
  const featuredProducts = await Product.find({
    isFeatured: true,
    isActive: true,
  }).limit(8);
  let allProducts: IProduct[] = [];
  if (featuredProducts.length < 8) {
    allProducts = await Product.find({ isFeatured: false, isActive: true })
      .sort({ createdAt: -1 })
      .limit(8 - featuredProducts.length);
  }
  const result = [...featuredProducts, ...allProducts];
  return result;
};
export const productServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProdactDetails,
  getAllDeletedProducts,
  restoreProduct,
  getAllTrendingProducts,
  getTopRatedProducts,
  updateFeaturedProductStatusIntoDB,
  getAllFeaturedProductFromDB,
};
