// req and res manage

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import { Request, Response } from 'express';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';



const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.role = 'admin'; 
  const result = await userService.createAdmin(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users getting successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  console.log(req.params);
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User getting successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const result = await userService.updateUser(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid user ID');
  }

  const deletedUser = await User.findByIdAndDelete(id); // Physically delete the user

  if (!deletedUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: deletedUser,
  });
});


export const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid user ID');
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { status }, // Update the status
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Status updated successfully',
    data: updatedUser,
  });
});

export const userController = {
  createAdmin,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changeStatus
};
