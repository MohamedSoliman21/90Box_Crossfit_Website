import express from 'express';
import { AddMessage, DeleteMessage, UpdateMessage, getAllMessages } from '../controller/botController';

const botRouter = express.Router();

botRouter.get("/", getAllMessages);

botRouter.post('/', AddMessage);

botRouter.put('/:id', UpdateMessage);

botRouter.delete('/:id', DeleteMessage);

export default botRouter;