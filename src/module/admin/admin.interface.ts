import { Model } from "mongoose";



export interface IAdmin {
    name: string;  
    email: string;             
    password: string;   
    profileImg?: string;       
  }
  



  export interface AdminModel extends Model<IAdmin> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: string): Promise<IAdmin | null>;
  }