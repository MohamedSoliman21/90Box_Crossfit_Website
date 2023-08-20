import {Request, Response} from "express"
import contact from "../models/contact"

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const AllCareers = await contact.find({});
        res.json(AllCareers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving contact' });
    } 
}

export const getContactByID = async (req: Request, res: Response) => {
    try {
        const career = await contact.findById(req.params.id);
        res.json(career)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving contact' });
    }
}

export const AddContact = async (req: Request, res: Response) => {
    try {
        const career = await contact.create(req.body);
        res.status(201).json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding contact' });
    }
}

export const DeleteContact = async (req:Request, res:Response) => {
    try {
        const career = await contact.findByIdAndDelete(req.params.id);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting contact' });
    }
}