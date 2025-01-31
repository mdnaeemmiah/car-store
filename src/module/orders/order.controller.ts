import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import httpStatus from "http-status";
import Order from "./order.model";

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  console.log(user);
  const order = await orderService.createOrder(user, req.body, req.ip!);
  //  console.log(order,'naeem')
  sendResponse(res, {
    success:true,
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    success:true,
    statusCode: httpStatus.CREATED,
    message: "Order retrieved successfully",
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success:true,
    statusCode: httpStatus.CREATED,
    message: "Order verified successfully",
    data: order,
  });
});


const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status }, // Update the status
    { new: true } // Return the updated document
  );



  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Status updated successfully',
    data: updatedOrder,
  });
});


export const orderController = { createOrder, verifyPayment, getOrders,changeStatus };
