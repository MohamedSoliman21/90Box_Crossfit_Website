"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMessage = exports.UpdateMessage = exports.AddMessage = exports.getAllMessages = void 0;
const chatbot_1 = __importDefault(require("../models/chatbot"));
const getAllMessages = async (req, res) => {
    try {
        const AllMessages = await chatbot_1.default.find({});
        res.json(AllMessages);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Messages' });
    }
};
exports.getAllMessages = getAllMessages;
const AddMessage = async (req, res) => {
    try {
        const message = await chatbot_1.default.create(req.body);
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Message' });
    }
};
exports.AddMessage = AddMessage;
const UpdateMessage = async (req, res) => {
    try {
        const message = await chatbot_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating career' });
    }
};
exports.UpdateMessage = UpdateMessage;
const DeleteMessage = async (req, res) => {
    try {
        const message = await chatbot_1.default.findByIdAndDelete(req.params.id);
        res.json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting career' });
    }
};
exports.DeleteMessage = DeleteMessage;
