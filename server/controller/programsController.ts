import {Request, Response} from "express"
import programs, {IPrograms} from "../models/programs"
import path from "path";
import fs from 'fs';

export const getAllPrograms = async (req: Request, res: Response) => {
    try {
        const AllPrograms = await programs.find({});
        res.json(AllPrograms);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving program' });
    } 
}

export const getProgramByID = async (req: Request, res: Response) => {
    try {
        const Program = await programs.findById(req.params.id);
        res.json(Program)
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving program' });
    }
}

export const UpdateProgram = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {Title, Description, ArabicTitle, ArabicDescription} = req.body;
        const imagePath = req.file;

        const Program = await programs.findById(id);

        if(!Program) {
            return res.status(404).json({ success: false, error: 'Program not found' }); 
        }

        if (imagePath && Program.Image) {
            const oldImagePath = Program.Image.toString();
            const oldImageFilePath = path.join(__dirname, '..', oldImagePath);
            fs.unlinkSync(oldImageFilePath);
        }

        Program.Title = Title;
        Program.Description = Description;
        Program.ArabicTitle = ArabicTitle;
        Program.ArabicDescription = ArabicDescription;
        Program.Image = imagePath?.path || Program.Image;
        
        const updatedProgram = await Program.save();

        res.status(200).json({ success: true, data: updatedProgram });    } 
    catch (error){
        res.status(500).json({ error: 'An error occurred while Updating program' });
    }
}

export const AddProgram = async (req: Request, res: Response) => {
    try {
        const {Title, Description, ArabicTitle, ArabicDescription} = req.body;
        const imagePath = req.file?.path;
        const newProgram : IPrograms = new programs({
            Title: Title,
            Description: Description,
            ArabicTitle: ArabicTitle,
            ArabicDescription: ArabicDescription,
            Image: imagePath
        })
        const Program = await newProgram.save();
        res.status(201).json({sucsses: true, data: Program});
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding program' });
    }
}

export const DeleteProgram = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const program = await programs.findById(id);
        if(!program) {
            return res.status(404).json({success: false, error: 'Program not found'})
        }
        const imagePath = program.Image?.toString();
        
        await program.deleteOne({_id: id});

        if(imagePath) {
            const imageFilePath = path.join(__dirname, '..', imagePath);
            fs.unlinkSync(imageFilePath);
        }
        res.status(200).json({success: true, data: {}});
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting program' });
    }
}