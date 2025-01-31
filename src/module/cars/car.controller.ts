import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { carService } from './car.service';


export const creteCar = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const newProduct = await carService.creteCarIntoDB(productData);
  sendResponse(res, {
    success:true,
    statusCode: StatusCodes.CREATED,
    message: "Car created successfully",
    data: newProduct,
  });
});


export const getAllCar = catchAsync(
  async (req: Request, res: Response) => {
    const products = await carService.getCar();
    sendResponse(res, {
      success:true,
      statusCode: StatusCodes.OK,
      message: "Cars retrieved successfully",
      data: products,
    });
  }
);

export const getSingleCar = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await carService.getSingleCar(productId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success:true,
      message: "Car retrieved successfully",
      data: product,
    });
  }
);

export const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCar = await carService.deleteCar(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Car deleted successfully",
    data: deletedCar, // Return the updated car object
  });
});




export const carController = {
  creteCar,
  getAllCar,
  getSingleCar,
  deleteCar
}
