import {Request, Response} from "express"
import chatbot from "../models/chatbot"

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const AllMessages = await chatbot.find({});
        res.json(AllMessages);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Messages' });
    } 
}

export const AddMessage = async (req: Request, res: Response) => {
    try {
        const message = await chatbot.create(req.body);
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Message' });
    }
}

export const UpdateMessage = async (req: Request, res: Response) => {
    try {
        const message = await chatbot.findByIdAndUpdate(req.params.id, req.body);
        res.json(message);
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating career' });
    }
}

export const DeleteMessage = async (req:Request, res:Response) => {
    try {
        const message = await chatbot.findByIdAndDelete(req.params.id);
        res.json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting career' });
    }
}