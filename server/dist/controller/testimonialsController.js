"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTestimonial = exports.UpdateTestimonial = exports.AddTestimonial = exports.getTestimonialByID = exports.getAllTestimonials = void 0;
const testimonials_1 = __importDefault(require("../models/testimonials"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllTestimonials = async (req, res) => {
    try {
        const AllTestimonials = await testimonials_1.default.find({});
        res.json(AllTestimonials);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving testimonials' });
    }
};
exports.getAllTestimonials = getAllTestimonials;
const getTestimonialByID = async (req, res) => {
    try {
        const testimonial = await testimonials_1.default.findById(req.params.id);
        res.json(testimonial);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving testimonials' });
    }
};
exports.getTestimonialByID = getTestimonialByID;
const AddTestimonial = async (req, res) => {
    try {
        const { Name, Content, ArabicName, ArabicContent } = req.body;
        const imagePath = req.file?.path;
        const newTestimonial = new testimonials_1.default({
            Name: Name,
            ArabicName: ArabicName,
            Content: Content,
            ArabicContent: ArabicContent,
            Image: imagePath
        });
        await newTestimonial.save();
        res.status(201).json({ success: true, data: newTestimonial });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
exports.AddTestimonial = AddTestimonial;
const UpdateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Content, ArabicName, ArabicContent } = req.body;
        const imagePath = req.file;
        const testimonial = await testimonials_1.default.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }
        if (imagePath && testimonial.Image) {
            const oldImagePath = testimonial.Image.toString();
            const oldImageFilePath = path_1.default.join(__dirname, '..', oldImagePath);
            fs_1.default.unlinkSync(oldImageFilePath);
        }
        testimonial.Name = Name;
        testimonial.Content = Content;
        testimonial.ArabicName = ArabicName;
        testimonial.ArabicContent = ArabicContent;
        testimonial.Image = imagePath?.path || testimonial.Image;
        const updatedTestimonial = await testimonial.save();
        res.status(200).json({ success: true, data: updatedTestimonial });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating testimonials' });
    }
};
exports.UpdateTestimonial = UpdateTestimonial;
const DeleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await testimonials_1.default.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, error: 'Testimonial not found' });
        }
        const imagePath = testimonial.Image?.toString();
        await testimonials_1.default.deleteOne({ _id: id });
        if (imagePath) {
            const imageFilePath = path_1.default.join(__dirname, '..', imagePath);
            fs_1.default.unlinkSync(imageFilePath);
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting testimonials' });
    }
};
exports.DeleteTestimonial = DeleteTestimonial;
