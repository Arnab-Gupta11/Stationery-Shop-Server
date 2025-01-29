import { JwtPayload } from 'jsonwebtoken';
import { Product } from '../product/product.model';
import { TProductsOrder } from './order.interface';
import { Order } from './order.model';
import mongoose from 'mongoose';

const createNewOrderIntoDB = async (
  orderData: TProductsOrder,
  user: JwtPayload,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { products } = orderData;
    let totalOrderPrice = 0;
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product with ID ${item.product} not found.`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(
          `Only ${product.quantity} items of ${product.name} are available in stock.`,
        );
      }

      // Calculate total price for each product
      const totalPrice = item.quantity * product.price;
      totalOrderPrice += totalPrice;

      updatedProducts.push({
        product: product._id,
        quantity: item.quantity,
        totalPrice,
      });

      // Update product stock
      product.quantity -= item.quantity;
      if (product.quantity === 0) {
        product.inStock = false;
      }
      await product.save({ session });
    }

    const orderDetails = {
      user: user.userId,
      products: updatedProducts,
      totalOrderPrice,
      status: 'Pending',
      paymentStatus: 'Pending',
    };

    // Create order in DB
    const newOrder = await Order.create([orderDetails], { session });

    // ✅ If everything is successful, commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newOrder;
  } catch (error) {
    // ❌ If any error occurs, roll back (undo) all changes
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const calulateRevenue = async () => {
  const revenueData = await Order.aggregate([
    //stage-1:get the product details using product key.
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    //stage-2: unwind the productDetails array.
    {
      $unwind: '$productDetails',
    },
    //stage-3: calculate total price for each order.
    {
      $addFields: {
        calculatedTotalPrice: {
          $multiply: ['$productDetails.price', '$quantity'],
        },
      },
    },
    //stage-4:group all the order.the calculate total revenue
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$calculatedTotalPrice' },
      },
    },
    //stage-5: send the required data.
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  const totalRevenue = revenueData[0]?.totalRevenue || 0;
  return totalRevenue;
};

export const orderService = {
  createNewOrderIntoDB,
  calulateRevenue,
};
