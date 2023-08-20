import express from 'express';
import { AddContact, DeleteContact, getAllContacts, getContactByID } from '../controller/contactController';

const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);

contactRouter.get ("/:id", getContactByID);

contactRouter.post('/', AddContact);

contactRouter.delete('/:id', DeleteContact);

export default contactRouter;