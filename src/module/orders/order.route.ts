import { Router } from "express";
import { orderController } from "./order.controller";


const orderRoute =Router()

orderRoute.post('/',orderController.creteOrder)
orderRoute.get('/revenue', orderController.getRevenue);
orderRoute.get('/',orderController.getOrder)

export default orderRoute;