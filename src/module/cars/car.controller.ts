import { Request, Response } from 'express'
import { carService } from './car.service'

const creteCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const result = await carService.creteCarIntoDB(payload)

    res.send({
      message: 'car create successfully',
      success: true,
      data: result,
    })
  } catch (err: any) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || 'Something went wrong',
      error: err.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }
}

const getCar = async (req: Request, res: Response) => {
  try {
   
    const {searchText} = req.query;

    const query = {
      $and: [
        { brand: { $regex: String(searchText), $options: "i" } },
        { model: { $regex: String(searchText), $options: "i" } },  
        { category: { $regex: String(searchText), $options: "i" } },  
      ],
    };


    
    const result = await carService.getCar()
    
    res.send({
      message: 'car get successfully',
      success: true,
      data: result,
    })
  } catch (err: any) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || 'Something went wrong',
      error: err.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }
}
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const {carId} = req.params;
    const result = await carService.getSingleCar(carId)

    res.send({
      message: 'single car get successfully',
      success: true,
      data: result,
    })
  } catch (err: any) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || 'Something went wrong',
      error: err.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }
}
const updateCar = async (req: Request, res: Response) => {
  try {
    const carId= req.params.carId
    const body=req.body
    const result = await carService.updateCar(carId,body)

    res.send({
      message: 'updated car successfully',
      success: true,
      data: result,
    })
  } catch (err: any) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || 'Something went wrong',
      error: err.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }
}
const deleteCar = async (req: Request, res: Response) => {
  try {
    const carId= req.params.carId
    const result = await carService.deleteCar(carId)

    res.send({
      message: 'deleted car successfully',
      success: true,
      data: result,
    })
  } catch (err: any) {
    res.status(err.status || 500).send({
      success: false,
      message: err.message || 'Something went wrong',
      error: err.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }
}






export const carController = {
  creteCar,
  getCar,
  getSingleCar,
  updateCar,
  deleteCar
}
