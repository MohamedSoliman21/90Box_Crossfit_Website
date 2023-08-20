"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContact = exports.AddContact = exports.getContactByID = exports.getAllContacts = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const getAllContacts = async (req, res) => {
    try {
        const AllCareers = await contact_1.default.find({});
        res.json(AllCareers);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving contact' });
    }
};
exports.getAllContacts = getAllContacts;
const getContactByID = async (req, res) => {
    try {
        const career = await contact_1.default.findById(req.params.id);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving contact' });
    }
};
exports.getContactByID = getContactByID;
const AddContact = async (req, res) => {
    try {
        const career = await contact_1.default.create(req.body);
        res.status(201).json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding contact' });
    }
};
exports.AddContact = AddContact;
const DeleteContact = async (req, res) => {
    try {
        const career = await contact_1.default.findByIdAndDelete(req.params.id);
        res.json(career);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting contact' });
    }
};
exports.DeleteContact = DeleteContact;
