import { Request, Response } from "express"
import { orderService } from "./order.service"


const creteOrder = async (req: Request, res: Response) => {
    try {
      const payload = req.body
  
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


  export const orderController={
    creteOrder
  }
  