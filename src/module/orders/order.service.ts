import { IUser } from "../user/user.interface";
import Order from "./order.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { orderUtils } from "./order.utils";
import Car from "../cars/car.model";
import { Document } from "mongoose";
import { IOrder } from "./order.interface";



const getOrders = async () => {
  const data = await Order.find();
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (!verifiedPayment.length) {
    throw new Error("Order verification failed. No transaction found.");
  }

  await Order.findOneAndUpdate(
    { "transaction.id": order_id },
    {
      "transaction.bank_status": verifiedPayment[0].bank_status,
      "transaction.sp_code": verifiedPayment[0].sp_code,
      "transaction.sp_message": verifiedPayment[0].sp_message,
      "transaction.transactionStatus": verifiedPayment[0].transaction_status,
      "transaction.method": verifiedPayment[0].method,
      "transaction.date_time": verifiedPayment[0].date_time,
      status:
        verifiedPayment[0].bank_status === "Success"
          ? "Paid"
          : verifiedPayment[0].bank_status === "Failed"
          ? "Pending"
          : verifiedPayment[0].bank_status === "Cancel"
          ? "Cancelled"
          : "Unknown",
    },
    { new: true }
  );

  return verifiedPayment;
};


const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};


export const orderService = {
  // createOrder,
  getOrders,
  verifyPayment,
  changeStatus
};
