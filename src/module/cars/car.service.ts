
import mongoose from 'mongoose';
import { ICar } from './car.interface'
import Car from './car.model'
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';

// const creteCarIntoDB = async (payload: ICar) => {
//   const result = await Car.create(payload)
//   return result
// }
async function creteCarIntoDB(payload: ICar) {
  const product = Car.create(payload);
  return product;
}
const getCar = async () => {
  const result = await Car.find()
  return result
}

const getSingleCar = async (id: string)=> {
  const result = await Car.findById(id)
  return result
}

// const updateCar = async (id: string, data: ICar) => {
//   const result = await Car.findByIdAndUpdate(id, data, { new: true })
//   return result
// }

const deleteCar = async (id: string) => {

  const deletedCar = await Car.findByIdAndDelete(
    id,
    { delete: true },
  );


  if (!deletedCar) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Car not found');
  }

  return deletedCar;
};

export const carService = {
  creteCarIntoDB,
  getCar,
  getSingleCar,
  // updateCar,
  deleteCar
}
