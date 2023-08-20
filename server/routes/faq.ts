import express from 'express';
import { AddFaq, DeleteFaq, UpdateFaq, getAllFaqs } from '../controller/faqController';

const faqRouter = express.Router();

faqRouter.get("/", getAllFaqs);

faqRouter.post('/', AddFaq);

faqRouter.put('/:id', UpdateFaq);

faqRouter.delete('/:id', DeleteFaq);

export default faqRouter;