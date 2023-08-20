import express, { RequestHandler } from 'express';
import { AddTeam, DeleteTeam, UpdateTeam, getAllTeam, getTeamByID } from '../controller/teamController';
import upload from '../middlewares/upload';

const teamRouter = express.Router();

teamRouter.get("/", getAllTeam);

teamRouter.get ("/:id", getTeamByID);

teamRouter.post('/', upload.single("Image"), AddTeam as RequestHandler);

teamRouter.put('/:id', upload.single("Image"), UpdateTeam as RequestHandler);

teamRouter.delete('/:id', DeleteTeam);

export default teamRouter;