"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCareer = exports.UpdateCareer = exports.AddCareer = exports.getCareerByID = exports.getAllCareers = void 0;
const careers_1 = __importDefault(require("../models/careers"));
const getAllCareers = async (req, res) => {
    try {
        const AllCareers = await careers_1.default.find({});
        res.json(AllCareers);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving career' });
    }
};
exports.getAllCareers = getAllCareers;
const getCareerByID = async (req, res) => {
    try {
        const career = await careers_1.default.findById(req.params.id);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving career' });
    }
};
exports.getCareerByID = getCareerByID;
const AddCareer = async (req, res) => {
    try {
        const career = await careers_1.default.create(req.body);
        res.status(201).json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding career' });
    }
};
exports.AddCareer = AddCareer;
const UpdateCareer = async (req, res) => {
    try {
        const career = await careers_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating career' });
    }
};
exports.UpdateCareer = UpdateCareer;
const DeleteCareer = async (req, res) => {
    try {
        const career = await careers_1.default.findByIdAndDelete(req.params.id);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting career' });
    }
};
exports.DeleteCareer = DeleteCareer;
