import {Request, Response} from "express";
import team, { ITeam } from "../models/team";
import path from "path";
import fs from 'fs';

export const getAllTeam = async (req: Request, res: Response) => {
    try {
        const AllTeam = await team.find({});
        res.json(AllTeam);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving team' });
    }
}

export const getTeamByID = async (req: Request, res: Response) => {
    try {
        const Team = await team.findById(req.params.id);
        res.json(Team)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving team' });
    }
}

export const AddTeam = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const {Name, Title, ArabicName, ArabicTitle} = req.body;
        const imagePath = req.file?.path;
        const newTeam : ITeam = new team({
            Name: Name,
            Title: Title,
            ArabicName: ArabicName,
            ArabicTitle: ArabicTitle,
            Image: imagePath
        })
        console.log(newTeam);
        const Team = await newTeam.save();
        res.status(201).json({sucsses: true, data: Team});
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Team member' });
    }
}

export const UpdateTeam = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {Name, Title, ArabicName, ArabicTitle} = req.body;
        const imagePath = req.file;

        const Team = await team.findById(id);

        if(!Team) {
            return res.status(404).json({ success: false, error: 'Program not found' }); 
        }

        if (imagePath && Team.Image) {
            const oldImagePath = Team.Image.toString();
            const oldImageFilePath = path.join(__dirname, '..', oldImagePath);
            fs.unlinkSync(oldImageFilePath);
        }

        Team.Name = Name;
        Team.Title = Title;
        Team.ArabicName = ArabicName;
        Team.ArabicTitle = ArabicTitle;
        Team.Image = imagePath?.path || Team.Image;
        
        const updatedTeam = await Team.save();

        res.status(200).json({ success: true, data: updatedTeam });    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating Team member' });
    }
}

export const DeleteTeam = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const Team = await team.findById(id);
        if(!Team) {
            return res.status(404).json({success: false, error: 'Team member not found'})
        }
        const imagePath = Team.Image?.toString();
        
        await Team.deleteOne({_id: id});

        if(imagePath) {
            const imageFilePath = path.join(__dirname, '..', imagePath);
            fs.unlinkSync(imageFilePath);
        }
        res.status(200).json({success: true, data: {}});
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Team member' });
    }
}