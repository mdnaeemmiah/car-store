import express, { Request, Response } from 'express'
import carRoute from './module/cars/car.route'
import orderRoute from './module/orders/order.route'


const app = express()

// middleware
app.use(express.json())


app.use("/api/car",carRoute)
app.use("/api/order",orderRoute)

app.get('/', (req: Request, res: Response) => {
    res.send({
      status:true,
      message:'server live'
    })
  })
  
  export default app
