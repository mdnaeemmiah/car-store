import { Router } from "express";
import { carController } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.contant";


const carRoute=Router()

carRoute.post('/create-car',auth(USER_ROLE.admin), carController.creteCar)
carRoute.get('/:id',carController.getSingleCar)
// carRoute.put('/:carId',carController.updateCar)
carRoute.delete('/:id',carController.deleteCar)
carRoute.get('/',carController.getAllCar)

export default carRoute;