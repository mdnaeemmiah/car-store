import { IOrder } from './order.interface'
import Order from './order.model'

const creteOrder = async (payload: IOrder) => {
  const result = await Order.create(payload)
  return result
}


const getOrder = async () => {
  const result = await Order.find()
  return result
}


const calculateRevenue = async () => {
  try {
      // MongoDB aggregation pipeline
      const result = await Order.aggregate([
          {
              $group: {
                  _id: null, // Group all documents together
                  totalRevenue: { $sum: "$totalPrice" }, // Sum the totalPrice field
              },
          },
      ]);

      // Extract totalRevenue from the aggregation result
      const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

      return {
          message: "Revenue calculated successfully",
          status: true,
          data: {
              totalRevenue,
          },
      };
  } catch (error:any) {
      return {
          message: "Failed to calculate revenue",
          status: false,
          error: error.message,
      };
  }
};




export const orderService = {
  creteOrder,
  getOrder,
  calculateRevenue
}
