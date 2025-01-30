import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.contant";

const orderRouter = Router();

orderRouter.get("/verify", auth(USER_ROLE.user), orderController.verifyPayment);

orderRouter
  .route("/")
  .post(auth(USER_ROLE.user), orderController.createOrder)
  .get( orderController.getOrders);

export default orderRouter;
