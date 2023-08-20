import express, {Router} from 'express';
import { RequestHandler } from 'express';
import upload from '../middlewares/upload';
import { AddTestimonial, DeleteTestimonial, UpdateTestimonial, getAllTestimonials, getTestimonialByID } from '../controller/testimonialsController';

const testimonialRouter: Router = express.Router();



testimonialRouter.get("/", getAllTestimonials);

testimonialRouter.get ("/:id", getTestimonialByID);

testimonialRouter.post('/', upload.single('Image'), AddTestimonial as RequestHandler);

testimonialRouter.put('/:id', upload.single('Image'), UpdateTestimonial as RequestHandler);

testimonialRouter.delete('/:id', DeleteTestimonial);

export default testimonialRouter;