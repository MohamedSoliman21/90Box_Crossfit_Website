"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    Question: {
        type: String,
        required: true
    },
    Answer: {
        type: String,
        required: true
    },
    ArabicQuestion: {
        type: String,
        required: true,
    },
    ArabicAnswer: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("faq", faqSchema);
