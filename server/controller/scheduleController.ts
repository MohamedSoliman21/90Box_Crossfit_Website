import {Request, Response} from "express";
import schedule, { ISchedule } from "../models/schedule";
import path from "path";
import fs from 'fs';

export const getAllSchedule = async (req: Request, res: Response) => {
    try {
        const AllSchedules = await schedule.find({});
        res.json(AllSchedules);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving schedule' });
    }
}

export const getScheduleByID = async (req: Request, res: Response) => {
    try {
        const Schedule = await schedule.findById(req.params.id);
        res.json(Schedule)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving schedule' });
    }
}

export const AddSchedule = async (req: Request, res: Response) => {
    try {
        const {Name} = req.body;
        const imagePath = req.file?.path;
        const newSchedule : ISchedule = new schedule({
            Name: Name,
            Image: imagePath
        })
        const Program = await newSchedule.save();
        res.status(201).json({sucsses: true, data: Program});
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Schedule' });
    }
}

export const UpdateSchedule = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {Name} = req.body;
        const imagePath = req.file;

        const Schedule = await schedule.findById(id);

        if(!Schedule) {
            return res.status(404).json({ success: false, error: 'Schedule not found' }); 
        }

        if (imagePath && Schedule.Image) {
            const oldImagePath = Schedule.Image.toString();
            const oldImageFilePath = path.join(__dirname, '..', oldImagePath);
            fs.unlinkSync(oldImageFilePath);
        }

        Schedule.Name = Name;
        Schedule.Image = imagePath?.path || Schedule.Image;
        
        const updatedSchedule = await Schedule.save();

        res.status(200).json({ success: true, data: updatedSchedule });    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating Schedule' });
    }
}

export const DeleteSchedule = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const Schedule = await schedule.findById(id);
        if(!Schedule) {
            return res.status(404).json({success: false, error: 'Schedule not found'})
        }
        const imagePath = Schedule.Image?.toString();
        
        await Schedule.deleteOne({_id: id});

        if(imagePath) {
            const imageFilePath = path.join(__dirname, '..', imagePath);
            fs.unlinkSync(imageFilePath);
        }
        res.status(200).json({success: true, data: {}});
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Schedule' });
    }
}