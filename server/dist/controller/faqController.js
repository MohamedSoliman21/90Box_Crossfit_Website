"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFaq = exports.UpdateFaq = exports.AddFaq = exports.getAllFaqs = void 0;
const faq_1 = __importDefault(require("../models/faq"));
const getAllFaqs = async (req, res) => {
    try {
        const AllFaqs = await faq_1.default.find({});
        res.json(AllFaqs);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Faq' });
    }
};
exports.getAllFaqs = getAllFaqs;
const AddFaq = async (req, res) => {
    try {
        const Faq = await faq_1.default.create(req.body);
        res.status(201).json(Faq);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Faq' });
    }
};
exports.AddFaq = AddFaq;
const UpdateFaq = async (req, res) => {
    try {
        const Faq = await faq_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(Faq);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating Faq' });
    }
};
exports.UpdateFaq = UpdateFaq;
const DeleteFaq = async (req, res) => {
    try {
        const Faq = await faq_1.default.findByIdAndDelete(req.params.id);
        res.json(Faq);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Faq' });
    }
};
exports.DeleteFaq = DeleteFaq;
