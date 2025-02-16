
import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './admin.constant';

const router = express.Router();



router.patch('/users/:id/block', AdminControllers.blockUser); 
router.delete('/cars/:id', AdminControllers.deleteCar);
router.get('/',
    AdminControllers.getAllAdmins,
  );

export const AdminRoutes = router;
