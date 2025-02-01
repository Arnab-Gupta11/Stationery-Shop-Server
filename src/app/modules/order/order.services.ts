import { Product } from '../product/product.model';
import { TProductsOrder } from './order.interface';
import { Order } from './order.model';
import mongoose from 'mongoose';
import { IUser } from '../user/user.interface';
import { orderUtils } from './order.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';

// const createNewOrderIntoDB = async (
//   orderData: TProductsOrder,
//   user: IUser,
//   client_ip: string,
// ) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { products } = orderData;
//     let totalOrderPrice = 0;
//     const updatedProducts = [];

//     for (const item of products) {
//       const product = await Product.findById(item.product).session(session);

//       if (!product) {
//         throw new Error(`Product with ID ${item.product} not found.`);
//       }

//       if (product.quantity < item.quantity) {
//         throw new Error(
//           `Only ${product.quantity} items of ${product.name} are available in stock.`,
//         );
//       }

//       // Calculate total price for each product
//       const totalPrice = item.quantity * product.price;
//       totalOrderPrice += totalPrice;

//       updatedProducts.push({
//         product: product._id,
//         quantity: item.quantity,
//         totalPrice,
//       });

//       // Update product stock
//       product.quantity -= item.quantity;
//       if (product.quantity === 0) {
//         product.inStock = false;
//       }
//       await product.save({ session });
//     }

//     const orderDetails = {
//       user: user._id,
//       products: updatedProducts,
//       totalOrderPrice,
//       status: 'Pending',
//       paymentStatus: 'Pending',
//     };

//     // Create order in DB
//     const newOrder: TOrder[] = await Order.create([orderDetails], {
//       session,
//     });

//     // ✅ If everything is successful, commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     // payment integration
//     const shurjopayPayload = {
//       amount: totalOrderPrice,
//       order_id: newOrder[0]._id,
//       currency: 'BDT',
//       customer_name: user.fullName,
//       customer_address: user.address,
//       customer_email: user.email,
//       customer_phone: user.phone,
//       customer_city: user.city,
//       client_ip,
//     };

//     const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
//     if (payment?.transactionStatus) {
//       await Order.updateOne({
//         transaction: {
//           id: payment.sp_order_id,
//           transactionStatus: payment.transactionStatus,
//         },
//       });
//     }

//     return payment.checkout_url;
//   } catch (error) {
//     // ❌ If any error occurs, roll back (undo) all changes
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };

const createNewOrderIntoDB = async (
  orderData: TProductsOrder,
  user: IUser,
  client_ip: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { products, userInfo } = orderData;
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
      user: user._id,
      products: updatedProducts,
      totalOrderPrice,
      status: 'Pending',
      paymentStatus: 'Pending',
    };

    // Create order in DB
    const newOrder = await Order.create([orderDetails], { session });

    // ✅ Proceed with payment
    const shurjopayPayload = {
      amount: totalOrderPrice,
      order_id: newOrder[0]._id,
      currency: 'BDT',
      customer_name: userInfo.fullName,
      customer_address: userInfo.address,
      customer_email: userInfo.email,
      customer_phone: userInfo.phone,
      customer_city: userInfo.city,
      client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    // ❌ If payment fails, rollback transaction (but do not call abortTransaction twice)
    if (!payment?.transactionStatus) {
      throw new Error('Payment failed. Order has been canceled.');
    }

    // ✅ If payment succeeds, update order with transaction details
    await Order.updateOne(
      { _id: newOrder[0]._id },
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { session },
    );

    // ✅ Commit the transaction if everything is successful
    await session.commitTransaction();
    return payment.checkout_url;
  } catch (error) {
    // ❌ Ensure rollback happens only once
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    // ✅ Ensure session always ends
    session.endSession();
  }
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        paymentStatus:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : 'Pending',
      },
    );
  }

  return verifiedPayment;
};

export const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find()
      .populate('user', 'fullName email')
      .populate('products.product'),
    query,
  ).paginate();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
  // return await Order.find()
  //   .populate('user', 'name email')
  //   .populate('products.product');
};

const getSingleUserAllOrders = async (user: JwtPayload) => {
  const orders = await Order.find({ user: user._id })
    .populate({
      path: 'products.product',
    })
    .sort({ createdAt: -1 }); // Sort orders by most recent

  return orders;
};

const updateOrderStatusIntoDB = async (id: string, updates: object) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { ...updates },
    { new: true, runValidators: true },
  );
  return result;
};

export const orderService = {
  getAllOrders,
  createNewOrderIntoDB,
  verifyPayment,
  updateOrderStatusIntoDB,
  getSingleUserAllOrders,
};
