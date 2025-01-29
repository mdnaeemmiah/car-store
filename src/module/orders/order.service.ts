import { IUser } from "../user/user.interface";
import Order from "./order.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { orderUtils } from "./order.utils";
import Car from "../cars/car.model";
import { Document } from "mongoose";
import { IOrder } from "./order.interface";

const createOrder = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  }

  const products = payload.products;
  let totalPrice = 0;

  const productDetails = await Promise.all(
    products.map(async (item) => {
      if (!item.product) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product is required");
      }

      const product = await Car.findById(item.product);

      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, `Product with ID ${item.product} not found`);
      }

      const subtotal = (product.price || 0) * item.quantity;
      totalPrice += subtotal;

      return {
        product: product._id,
        quantity: item.quantity,
      };
    })
  );

  const validProductDetails = productDetails.filter((item) => item !== null);

  if (!validProductDetails.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "No valid products found");
  }

  const order = await Order.create({
    user,
    products: validProductDetails,
    totalPrice,
  });

  // Ensure the required fields are included
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_email: user.email,
    client_ip,
    customer_address: user.address,  // Ensure user has an address
    customer_phone: user.phone,      // Ensure user has a phone
    customer_city: user.city,        // Ensure user has a city
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload).catch((err) => {
    console.error("Payment Error:", err);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Payment failed");
  });

  console.log("Payment Response:", payment);

  if (!payment?.checkout_url) {
    console.error("Payment did not return a checkout URL", payment);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Payment did not return a checkout URL");
  }

  if (payment.transactionStatus) {
    await Order.updateOne(
      { _id: order._id },
      {
        $set: {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
      }
    );
  }

  return payment.checkout_url;
};



const getOrders = async () => {
  const data = await Order.find();
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
};
