import  { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";


const OrderSchema = new Schema<IOrder>({
    email: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true }, 
    quantity: { type: Number, required: true, min: 1 }, 
    totalPrice: { type: Number, required: true }, 
  },
  { timestamps: true });


  // calculate total revenue using mongoose middleware
  // OrderSchema.pre('save',async function(next){
  //   this.totalPrice=this.totalPrice*this.quantity;
  //   next()
  // })


  const Order = model<IOrder>("Order",OrderSchema)

  export default Order;