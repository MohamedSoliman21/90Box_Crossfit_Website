import {Request, Response} from "express"
import testimonials, { ITestimonial } from "../models/testimonials"
import path from "path";
import fs from 'fs';

export const getAllTestimonials = async (req: Request, res: Response) => {
    try {
        const AllTestimonials = await testimonials.find({});
        res.json(AllTestimonials);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving testimonials' });
    }
}

export const getTestimonialByID = async (req: Request, res: Response) => {
    try {
        const testimonial = await testimonials.findById(req.params.id);
        res.json(testimonial)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving testimonials' });
    }
}

export const AddTestimonial = async (req: Request, res: Response) => {
    try {
        const {Name, Content, ArabicName, ArabicContent} = req.body;
        const imagePath = req.file?.path;
        const newTestimonial: ITestimonial = new testimonials({
            Name: Name,
            ArabicName: ArabicName,
            Content: Content,
            ArabicContent: ArabicContent,
            Image: imagePath
        })
        await newTestimonial.save();
        res.status(201).json({ success: true, data: newTestimonial });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const UpdateTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { Name, Content, ArabicName, ArabicContent } = req.body;
        const imagePath = req.file;

        const testimonial = await testimonials.findById(id);
        
        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }

        if (imagePath && testimonial.Image) {
            const oldImagePath = testimonial.Image.toString();
            const oldImageFilePath = path.join(__dirname, '..', oldImagePath);
            fs.unlinkSync(oldImageFilePath);
        }

        testimonial.Name = Name;
        testimonial.Content = Content;
        testimonial.ArabicName = ArabicName;
        testimonial.ArabicContent = ArabicContent;
        testimonial.Image = imagePath?.path || testimonial.Image;

        const updatedTestimonial = await testimonial.save();

        res.status(200).json({ success: true, data: updatedTestimonial });
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating testimonials' });
    }
}

export const DeleteTestimonial = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;

        const testimonial = await testimonials.findById(id);

        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }

        const imagePath = testimonial.Image?.toString();

        await testimonials.deleteOne({ _id: id });

        if (imagePath) {
            const imageFilePath = path.join(__dirname, '..', imagePath);
            fs.unlinkSync(imageFilePath);
        }

        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting testimonials' });
    }
}