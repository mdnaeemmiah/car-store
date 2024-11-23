import express, { Request, Response } from 'express'
import carRoute from './module/cars/car.route'
import orderRoute from './module/orders/order.route'
import cors from 'cors'

const app = express()
app.use(cors())

// middleware
app.use(express.json())


app.use("/api/cars",carRoute)
app.use("/api/orders",orderRoute)

app.get('/', (req: Request, res: Response) => {
    res.send({
      status:true,
      message:'server live'
    })
  })
  
  export default app
