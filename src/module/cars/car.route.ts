import { Router } from "express";
import { carController } from "./car.controller";


const carRoute=Router()

carRoute.post('/create-car',carController.creteCar)
carRoute.get('/:userId',carController.getSingleCar)
carRoute.put('/:userId',carController.updateCar)
carRoute.delete('/:userId',carController.deleteCar)
carRoute.get('/',carController.getCar)

export default carRoute;