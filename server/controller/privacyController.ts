import {Request, Response} from "express"
import privacy from "../models/privacy";

export const getAllPrivacy = async (req: Request, res: Response) => {
    try {
        const AllPolicies = await privacy.find({});
        res.json(AllPolicies);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Policies' });
    } 
}

export const AddPrivacy = async (req: Request, res: Response) => {
    try {
        const policy = await privacy.create(req.body);
        res.status(201).json(policy);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Policy' });
    }
}

export const UpdatePolicy = async (req: Request, res: Response) => {
    try {
        const policy = await privacy.findByIdAndUpdate(req.params.id, req.body);
        res.json(policy);
    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating Policy' });
    }
}

export const DeletePolicy = async (req:Request, res:Response) => {
    try {
        const policy = await privacy.findByIdAndDelete(req.params.id);
        res.json(policy);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Policy' });
    }
}