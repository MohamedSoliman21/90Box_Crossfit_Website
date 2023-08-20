import {Request, Response} from "express"
import careers from "../models/careers"

export const getAllCareers = async (req: Request, res: Response) => {
    try {
        const AllCareers = await careers.find({});
        res.json(AllCareers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving career' });
    } 
}

export const getCareerByID = async (req: Request, res: Response) => {
    try {
        const career = await careers.findById(req.params.id);
        res.json(career)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving career' });
    }
}

export const AddCareer = async (req: Request, res: Response) => {
    try {
        const career = await careers.create(req.body);
        res.status(201).json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding career' });
    }
}

export const UpdateCareer = async (req: Request, res: Response) => {
    try {
        const career = await careers.findByIdAndUpdate(req.params.id, req.body);
        res.json(career);
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating career' });
    }
}

export const DeleteCareer = async (req:Request, res:Response) => {
    try {
        const career = await careers.findByIdAndDelete(req.params.id);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting career' });
    }
}