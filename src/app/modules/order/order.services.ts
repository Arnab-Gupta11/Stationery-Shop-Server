import { create } from 'domain';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createNewOrderIntoDB = async (orderData: TOrder) => {
  const { quantity } = orderData;
  //Feth product details using product id in order
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
  const result = await Order.create(orderData);
  return result;
};

export const orderService = {
  createNewOrderIntoDB,
};
