import { Router } from 'express';
import carRoute from '../module/cars/car.route';
import orderRoute from '../module/orders/order.route';
import authRouter from '../module/auth/auth.route';
import userRouter from '../module/user/user.route';
import { AdminRoutes } from '../module/admin/admin.route';


const router = Router();


const moduleRoutes = [
    {
    path: '/auth',
    route: authRouter,
    },
    {
      path: '/cars',
      route: carRoute,
    },
    {
      path: '/orders',
      route: orderRoute,
    },
    {
      path: '/users',
      route: userRouter,
    },
    {
      path: '/admin',
      route: AdminRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;