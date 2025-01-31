

import QueryBuilder from '../../builder/QueryBuilder';
import Order from '../orders/order.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Admin } from './admin.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Admin.find(), query)
    .filter()
    .sort();
    
    return result;
};

const blockUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
      new: true,
    })
    return result
  };

  const deleteCar = async (id: string) => {
 
    const result = await Order.findByIdAndDelete(id);
    return result;
};



export const AdminServices = {
    deleteCar,
    blockUser,
    getAllAdminsFromDB
};
