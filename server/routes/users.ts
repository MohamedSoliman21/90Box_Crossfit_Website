import express from 'express';
import { AddUser, DeleteUser, Login, UpdateUser, getAllUsers, getUserByID } from '../controller/usersController';

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get ("/:id", getUserByID);

userRouter.post('/', AddUser);

userRouter.put('/:id', UpdateUser);

userRouter.delete('/:id', DeleteUser);

userRouter.post("/login", Login);

export default userRouter;