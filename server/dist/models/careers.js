"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const careersSchema = new mongoose_1.Schema({
    Title: {
        type: String,
        required: true
    },
    ArabicTitle: {
        type: String,
        required: true
    },
    Experience: {
        type: String,
        required: true,
    },
    Certificates: {
        type: (Array),
        required: true
    },
    ArabicCertificates: {
        type: (Array),
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ArabicDescription: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("careers", careersSchema);
