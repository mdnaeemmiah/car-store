import { Types } from "mongoose";

export interface IOrder {
    email: string; 
    carId: Types.ObjectId; 
    quantity: number; 
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  