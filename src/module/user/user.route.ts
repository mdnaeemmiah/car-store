import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.contant'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'



const userRouter = Router()

userRouter.post('/create-admin', userController.createAdmin)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/',userController.getUser)
userRouter.patch(
    '/change-status/:id',
    // auth( USER_ROLE.admin),
    validateRequest(UserValidation.changeStatusValidationSchema),
    userController.changeStatus,
  );

export default userRouter