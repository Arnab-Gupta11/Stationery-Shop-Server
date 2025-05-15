import Brand from '../brand/brand.model';
import { Category } from '../category/category.model';
import { Order } from '../order/order.model';
import Product from '../product/product.model';
import { User } from '../user/user.model';
import { TOrder } from '../order/order.interface';
import { IUser } from '../user/user.interface';

const getMetadata = async (authUser: IUser) => {
  if (authUser.role === 'admin') {
    const totalProducts = await Product.estimatedDocumentCount();
    const totalCategories = await Category.estimatedDocumentCount();
    const totalBrands = await Brand.estimatedDocumentCount();
    const totalUsers = await User.estimatedDocumentCount();
    const totalOrders = await Order.estimatedDocumentCount();
    const orders = (await Order.find().lean()) as TOrder[];
    const totalIncome = orders.reduce(
      (acc, order) => acc + order.totalOrderPrice,
      0,
    );

    //Get latest 5 orders.
    const latestOrders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $unwind: '$userData',
      },
      {
        $project: {
          orderId: '$transaction.id',
          userName: '$userData.name',
          totalProductsCount: { $size: '$products' },
          totalOrderPrice: 1,
          paymentStatus: 1,
          orderStatus: '$status',
          orderPlaced: '$createdAt',
        },
      },
    ]);

    //Get Latest users.
    const latestUsers = await User.find({ isBlocked: false, role: 'user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName email profilePicture');

    //Get Product count according to parent category
    const getProductDistributionByParentCategory = await Product.aggregate([
      //stage-1 (Join category with sub-category)
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'subCategory',
        },
      },
      {
        $unwind: '$subCategory',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'subCategory.parent',
          foreignField: '_id',
          as: 'parentCategory',
        },
      },
      { $unwind: '$parentCategory' },
      {
        $group: { _id: '$parentCategory.name', productCount: { $sum: 1 } },
      },
      {
        $project: {
          name: '$_id',
          productCount: 1,
          _id: 0,
        },
      },
    ]);
    const getTopProducts = await Product.find({ isActive: true })
      .sort({ salesCount: -1 })
      .limit(5)
      .select('name salesCount');

    return {
      stateData: {
        totalCategories,
        totalUsers,
        totalProducts,
        totalBrands,
        totalOrders,
        totalIncome,
      },
      latestOrders,
      latestUsers,
      getProductDistributionByParentCategory,
      getTopProducts,
    };
  }
};

export const MetaServices = {
  getMetadata,
};
