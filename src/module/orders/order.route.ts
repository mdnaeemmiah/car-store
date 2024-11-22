import { Router } from "express";
import { orderController } from "./order.controller";


const orderRoute =Router()

orderRoute.post('/create-order',orderController.creteOrder)

export default orderRoute;