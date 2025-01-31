import mongoose, { model, Schema } from "mongoose";
import { ICar } from "./car.interface";


const CarSchema = new Schema<ICar>({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"], // Union type values
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String },
    delete:{type:Boolean,default:false}
  },
  { timestamps: true },
);

const Car = mongoose.model<ICar>("Car",CarSchema)

  export default Car;