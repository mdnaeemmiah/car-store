import mongoose, { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";


const OrderSchema = new Schema<IOrder>({
    email: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, 
    quantity: { type: Number, required: true, min: 1 }, 
    totalPrice: { type: Number, required: true }, 
  });


  const Order = model<IOrder>("Order",OrderSchema)

  export default Order;