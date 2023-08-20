import express, { RequestHandler } from 'express';
import { AddProgram, DeleteProgram, UpdateProgram, getAllPrograms, getProgramByID } from '../controller/programsController';
import upload from '../middlewares/upload';

const programsRouter = express.Router();

programsRouter.get("/", getAllPrograms);

programsRouter.get ("/:id", getProgramByID);

programsRouter.post('/', upload.single("Image"), AddProgram as RequestHandler);

programsRouter.put('/:id', upload.single("Image"), UpdateProgram as RequestHandler);

programsRouter.delete('/:id', DeleteProgram);

export default programsRouter;