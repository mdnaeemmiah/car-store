// req and res manage

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';



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
  const userId = req.params.userId;
  const body = req.body;
  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user deleted successfully',
    data: {},
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
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
