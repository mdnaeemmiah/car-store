import { Request, Response } from "express"
import { orderService } from "./order.service"
import Car from "../cars/car.model";


const creteOrder = async (req: Request, res: Response) => {
 
    try {
      const payload = req.body
      // Step 1: Validate the payload
      if (!payload) {
          throw new Error("Invalid payload. Please provide valid order details.");
      }

      const { carId, quantity } = payload;

      // Step 2: Fetch car details
      const car = await Car.findById(carId);
      if (!car) {
          throw new Error("Car not found");
      }

      // Step 3: Check stock availability
      if (!car.inStock) {
          throw new Error("Car is out of stock");
      }
      if (car.quantity < quantity) {
          throw new Error(`Insufficient stock. Only ${car.quantity} item(s) available.`);
      }

      // Step 4: Update car inventory
      car.quantity -= quantity;
      console.log(car);
      if (car.quantity === 0) {
          car.inStock = false;
      }

      // Step 5: Save the updated car record
      await car.save();

    const result = await orderService.creteOrder(payload)

    res.send({
      message: 'order create successfully',
      success: true,
      data: result,
    })
  } catch (err: any) {
      res.status(err.status || 500).send({
        success: false,
        message: err.message || 'Something went wrong',
        error: err.name || 'Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      })
    }
  }
const getOrder = async (req: Request, res: Response) => {
    try {
  
      const result = await orderService.getOrder()
  
      res.send({
        message: 'order get successfully',
        success: true,
        data: result,
      })
    } catch (err: any) {
      res.status(err.status || 500).send({
        success: false,
        message: err.message || 'Something went wrong',
        error: err.name || 'Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      })
    }
  }

  const getRevenue = async (req: Request, res: Response) => {
    try {
        const response = await orderService.calculateRevenue();
        res.status(200).json(response);
    } catch (error:any) {
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};


  export const orderController={
    creteOrder,
    getOrder,
    getRevenue
  }
  