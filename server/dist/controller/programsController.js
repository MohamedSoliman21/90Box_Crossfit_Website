"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProgram = exports.AddProgram = exports.UpdateProgram = exports.getProgramByID = exports.getAllPrograms = void 0;
const programs_1 = __importDefault(require("../models/programs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllPrograms = async (req, res) => {
    try {
        const AllPrograms = await programs_1.default.find({});
        res.json(AllPrograms);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving program' });
    }
};
exports.getAllPrograms = getAllPrograms;
const getProgramByID = async (req, res) => {
    try {
        const Program = await programs_1.default.findById(req.params.id);
        res.json(Program);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving program' });
    }
};
exports.getProgramByID = getProgramByID;
const UpdateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Description, ArabicTitle, ArabicDescription } = req.body;
        const imagePath = req.file;
        const Program = await programs_1.default.findById(id);
        if (!Program) {
            return res.status(404).json({ success: false, error: 'Program not found' });
        }
        if (imagePath && Program.Image) {
            const oldImagePath = Program.Image.toString();
            const oldImageFilePath = path_1.default.join(__dirname, '..', oldImagePath);
            fs_1.default.unlinkSync(oldImageFilePath);
        }
        Program.Title = Title;
        Program.Description = Description;
        Program.ArabicTitle = ArabicTitle;
        Program.ArabicDescription = ArabicDescription;
        Program.Image = imagePath?.path || Program.Image;
        const updatedProgram = await Program.save();
        res.status(200).json({ success: true, data: updatedProgram });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating program' });
    }
};
exports.UpdateProgram = UpdateProgram;
const AddProgram = async (req, res) => {
    try {
        const { Title, Description, ArabicTitle, ArabicDescription } = req.body;
        const imagePath = req.file?.path;
        const newProgram = new programs_1.default({
            Title: Title,
            Description: Description,
            ArabicTitle: ArabicTitle,
            ArabicDescription: ArabicDescription,
            Image: imagePath
        });
        const Program = await newProgram.save();
        res.status(201).json({ sucsses: true, data: Program });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding program' });
    }
};
exports.AddProgram = AddProgram;
const DeleteProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await programs_1.default.findById(id);
        if (!program) {
            return res.status(404).json({ success: false, error: 'Program not found' });
        }
        const imagePath = program.Image?.toString();
        await program.deleteOne({ _id: id });
        if (imagePath) {
            const imageFilePath = path_1.default.join(__dirname, '..', imagePath);
            fs_1.default.unlinkSync(imageFilePath);
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting program' });
    }
};
exports.DeleteProgram = DeleteProgram;
