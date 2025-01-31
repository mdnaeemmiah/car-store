import { Types } from "mongoose";

export interface ICar {
    brand: string; 
    model: string; 
    year: number;
    price: number; 
    category: "Sedan" | "SUV" | "Truck" | "Coupe" | "Convertible";
    description: string; 
    quantity: number; 
    stock: number;
    delete?:boolean;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  