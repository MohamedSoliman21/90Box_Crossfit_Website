"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTerm = exports.UpdateTerm = exports.AddTerm = exports.getAllTerms = void 0;
const terms_1 = __importDefault(require("../models/terms"));
const getAllTerms = async (req, res) => {
    try {
        const AllTerms = await terms_1.default.find({});
        res.json(AllTerms);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Terms' });
    }
};
exports.getAllTerms = getAllTerms;
const AddTerm = async (req, res) => {
    try {
        const Term = await terms_1.default.create(req.body);
        res.status(201).json(Term);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding term' });
    }
};
exports.AddTerm = AddTerm;
const UpdateTerm = async (req, res) => {
    try {
        const Term = await terms_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(Term);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating term' });
    }
};
exports.UpdateTerm = UpdateTerm;
const DeleteTerm = async (req, res) => {
    try {
        const Term = await terms_1.default.findByIdAndDelete(req.params.id);
        res.json(Term);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting term' });
    }
};
exports.DeleteTerm = DeleteTerm;
