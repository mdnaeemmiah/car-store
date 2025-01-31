
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
import { StatusCodes } from 'http-status-codes';

const blockUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await AdminServices.blockUser(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success:true,
    message: 'User blocked successfully',
    data: result,
  });
  });
  
const deleteCar = catchAsync(async (req, res) => {
  const id = req.params.id;
  await AdminServices.deleteCar(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success:true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});


export const AdminControllers = {
  deleteCar,
  blockUser,
  getAllAdmins
};