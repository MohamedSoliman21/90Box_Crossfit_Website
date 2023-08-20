"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testimonialSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true,
    },
    ArabicName: {
        type: String,
        required: true
    },
    ArabicContent: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    }
});
exports.default = (0, mongoose_1.model)("testimonial", testimonialSchema);
