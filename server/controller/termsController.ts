import {Request, Response} from "express"
import terms from "../models/terms";

export const getAllTerms = async (req: Request, res: Response) => {
    try {
        const AllTerms = await terms.find({});
        res.json(AllTerms);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Terms' });
    } 
}

export const AddTerm = async (req: Request, res: Response) => {
    try {
        const Term = await terms.create(req.body);
        res.status(201).json(Term);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding term' });
    }
}

export const UpdateTerm = async (req: Request, res: Response) => {
    try {
        const Term = await terms.findByIdAndUpdate(req.params.id, req.body);
        res.json(Term);
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating term' });
    }
}

export const DeleteTerm = async (req:Request, res:Response) => {
    try {
        const Term = await terms.findByIdAndDelete(req.params.id);
        res.json(Term);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting term' });
    }
}