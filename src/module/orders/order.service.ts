import { IOrder } from './order.interface'
import Order from './order.model'

const creteOrder = async (payload: IOrder) => {
  const result = await Order.create(payload)
  return result
}

export const orderService = {
  creteOrder,
}
