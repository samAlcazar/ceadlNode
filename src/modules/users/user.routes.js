import { Router } from 'express'
import * as userController from './user.controller.js'

export const userRouter = Router()

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getUserById)
userRouter.post('/', userController.createUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.post('/login', userController.loginUser)
