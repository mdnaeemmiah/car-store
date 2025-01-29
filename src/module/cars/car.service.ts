
import { ICar } from './car.interface'
import Car from './car.model'

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
  const result = await Car.findByIdAndDelete(id)
  return result
}

export const carService = {
  creteCarIntoDB,
  getCar,
  getSingleCar,
  // updateCar,
  deleteCar
}
