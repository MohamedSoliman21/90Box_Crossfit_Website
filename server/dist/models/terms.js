"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const termsSchema = new mongoose_1.Schema({
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    ArabicTitle: {
        type: String,
        required: true,
    },
    ArabicContent: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("terms", termsSchema);
