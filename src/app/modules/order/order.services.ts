import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createNewOrderIntoDB = async (orderData: TOrder) => {
  const { quantity } = orderData;
  //Fetch product details using product id in order
  const product = await Product.findById(orderData.product);
  //product not found error
  if (!product) {
    const error = new Error(
      `Product with ID ${orderData.product} does not exist.`,
    );
    Object.assign(error, {
      name: 'NotFoundError',
      displayMessage: 'Resource not found',
      statusCode: 404,
      path: 'product',
      value: orderData.product,
    });
    throw error;
  }
  //Check stock available or not
  if (product.quantity < quantity) {
    const error = new Error(
      `Only ${product.quantity} items are available in stock`,
    );
    Object.assign(error, {
      name: 'StockError',
      displayMessage: 'Insufficient stock available.',
      statusCode: 400,
      path: 'quantity',
      value: quantity,
    });
    throw error;
  }
  //Update quantity and inStock in the product model.
  const newQuantity = product.quantity - quantity;
  if (newQuantity === 0) {
    const updatedProduct = { quantity: newQuantity, inStock: false };
    await Product.findByIdAndUpdate(product._id, updatedProduct);
  } else {
    await Product.findByIdAndUpdate(product._id, {
      quantity: newQuantity,
    });
  }
  //Create the new order into database.
  const result = await Order.create({
    ...orderData,
    // totalPrice: quantity * product.price,
  });
  return result;
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
