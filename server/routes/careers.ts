import express from 'express';
import { AddCareer, DeleteCareer, UpdateCareer, getAllCareers, getCareerByID } from '../controller/careersController';

const careersRouter = express.Router();

careersRouter.get("/", getAllCareers);

careersRouter.get ("/:id", getCareerByID);

careersRouter.post('/', AddCareer);

careersRouter.put('/:id', UpdateCareer);

careersRouter.delete('/:id', DeleteCareer);

export default careersRouter;