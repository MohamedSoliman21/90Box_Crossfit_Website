"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProgramsSchema = new mongoose_1.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ArabicTitle: {
        type: String,
        required: true
    },
    ArabicDescription: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true,
    }
});
exports.default = (0, mongoose_1.model)("programs", ProgramsSchema);
