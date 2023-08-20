"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTeam = exports.UpdateTeam = exports.AddTeam = exports.getTeamByID = exports.getAllTeam = void 0;
const team_1 = __importDefault(require("../models/team"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllTeam = async (req, res) => {
    try {
        const AllTeam = await team_1.default.find({});
        res.json(AllTeam);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving team' });
    }
};
exports.getAllTeam = getAllTeam;
const getTeamByID = async (req, res) => {
    try {
        const Team = await team_1.default.findById(req.params.id);
        res.json(Team);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving team' });
    }
};
exports.getTeamByID = getTeamByID;
const AddTeam = async (req, res) => {
    try {
        console.log(req.body);
        const { Name, Title, ArabicName, ArabicTitle } = req.body;
        const imagePath = req.file?.path;
        const newTeam = new team_1.default({
            Name: Name,
            Title: Title,
            ArabicName: ArabicName,
            ArabicTitle: ArabicTitle,
            Image: imagePath
        });
        console.log(newTeam);
        const Team = await newTeam.save();
        res.status(201).json({ sucsses: true, data: Team });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Team member' });
    }
};
exports.AddTeam = AddTeam;
const UpdateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Title, ArabicName, ArabicTitle } = req.body;
        const imagePath = req.file;
        const Team = await team_1.default.findById(id);
        if (!Team) {
            return res.status(404).json({ success: false, error: 'Program not found' });
        }
        if (imagePath && Team.Image) {
            const oldImagePath = Team.Image.toString();
            const oldImageFilePath = path_1.default.join(__dirname, '..', oldImagePath);
            fs_1.default.unlinkSync(oldImageFilePath);
        }
        Team.Name = Name;
        Team.Title = Title;
        Team.ArabicName = ArabicName;
        Team.ArabicTitle = ArabicTitle;
        Team.Image = imagePath?.path || Team.Image;
        const updatedTeam = await Team.save();
        res.status(200).json({ success: true, data: updatedTeam });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating Team member' });
    }
};
exports.UpdateTeam = UpdateTeam;
const DeleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const Team = await team_1.default.findById(id);
        if (!Team) {
            return res.status(404).json({ success: false, error: 'Team member not found' });
        }
        const imagePath = Team.Image?.toString();
        await Team.deleteOne({ _id: id });
        if (imagePath) {
            const imageFilePath = path_1.default.join(__dirname, '..', imagePath);
            fs_1.default.unlinkSync(imageFilePath);
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Team member' });
    }
};
exports.DeleteTeam = DeleteTeam;
