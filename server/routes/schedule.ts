import express, { RequestHandler } from 'express';
import { AddSchedule, DeleteSchedule, UpdateSchedule, getAllSchedule, getScheduleByID } from '../controller/scheduleController';
import upload from '../middlewares/upload';

const scheduleRouter = express.Router();

scheduleRouter.get("/", getAllSchedule);

scheduleRouter.get ("/:id", getScheduleByID);

scheduleRouter.post('/', upload.single("Image"), AddSchedule as RequestHandler);

scheduleRouter.put('/:id', upload.single("Image"), UpdateSchedule as RequestHandler);

scheduleRouter.delete('/:id', DeleteSchedule);

export default scheduleRouter;