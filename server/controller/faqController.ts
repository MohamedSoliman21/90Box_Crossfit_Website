import {Request, Response} from "express"
import faq from "../models/faq";

export const getAllFaqs = async (req: Request, res: Response) => {
    try {
        const AllFaqs = await faq.find({});
        res.json(AllFaqs);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Faq' });
    } 
}

export const AddFaq = async (req: Request, res: Response) => {
    try {
        const Faq = await faq.create(req.body);
        res.status(201).json(Faq);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Faq' });
    }
}

export const UpdateFaq = async (req: Request, res: Response) => {
    try {
        const Faq = await faq.findByIdAndUpdate(req.params.id, req.body);
        res.json(Faq);
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating Faq' });
    }
}

export const DeleteFaq = async (req:Request, res:Response) => {
    try {
        const Faq = await faq.findByIdAndDelete(req.params.id);
        res.json(Faq);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Faq' });
    }
}