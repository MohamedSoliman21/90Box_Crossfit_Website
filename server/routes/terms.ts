import express from 'express';
import { AddTerm, DeleteTerm, UpdateTerm, getAllTerms } from '../controller/termsController';

const termsRouter = express.Router();

termsRouter.get("/", getAllTerms);

termsRouter.post('/', AddTerm);

termsRouter.put('/:id', UpdateTerm);

termsRouter.delete('/:id', DeleteTerm);

export default termsRouter;