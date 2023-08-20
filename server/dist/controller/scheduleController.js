"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSchedule = exports.UpdateSchedule = exports.AddSchedule = exports.getScheduleByID = exports.getAllSchedule = void 0;
const schedule_1 = __importDefault(require("../models/schedule"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllSchedule = async (req, res) => {
    try {
        const AllSchedules = await schedule_1.default.find({});
        res.json(AllSchedules);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving schedule' });
    }
};
exports.getAllSchedule = getAllSchedule;
const getScheduleByID = async (req, res) => {
    try {
        const Schedule = await schedule_1.default.findById(req.params.id);
        res.json(Schedule);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving schedule' });
    }
};
exports.getScheduleByID = getScheduleByID;
const AddSchedule = async (req, res) => {
    try {
        const { Name } = req.body;
        const imagePath = req.file?.path;
        const newSchedule = new schedule_1.default({
            Name: Name,
            Image: imagePath
        });
        const Program = await newSchedule.save();
        res.status(201).json({ sucsses: true, data: Program });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Schedule' });
    }
};
exports.AddSchedule = AddSchedule;
const UpdateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name } = req.body;
        const imagePath = req.file;
        const Schedule = await schedule_1.default.findById(id);
        if (!Schedule) {
            return res.status(404).json({ success: false, error: 'Schedule not found' });
        }
        if (imagePath && Schedule.Image) {
            const oldImagePath = Schedule.Image.toString();
            const oldImageFilePath = path_1.default.join(__dirname, '..', oldImagePath);
            fs_1.default.unlinkSync(oldImageFilePath);
        }
        Schedule.Name = Name;
        Schedule.Image = imagePath?.path || Schedule.Image;
        const updatedSchedule = await Schedule.save();
        res.status(200).json({ success: true, data: updatedSchedule });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating Schedule' });
    }
};
exports.UpdateSchedule = UpdateSchedule;
const DeleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const Schedule = await schedule_1.default.findById(id);
        if (!Schedule) {
            return res.status(404).json({ success: false, error: 'Schedule not found' });
        }
        const imagePath = Schedule.Image?.toString();
        await Schedule.deleteOne({ _id: id });
        if (imagePath) {
            const imageFilePath = path_1.default.join(__dirname, '..', imagePath);
            fs_1.default.unlinkSync(imageFilePath);
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Schedule' });
    }
};
exports.DeleteSchedule = DeleteSchedule;
