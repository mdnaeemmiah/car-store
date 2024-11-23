import { Router } from "express";
import { carController } from "./car.controller";


const carRoute=Router()

carRoute.post('/create-car',carController.creteCar)
carRoute.get('/:carId',carController.getSingleCar)
carRoute.put('/:carId',carController.updateCar)
carRoute.delete('/:carId',carController.deleteCar)
carRoute.get('/',carController.getCar)

export default carRoute;