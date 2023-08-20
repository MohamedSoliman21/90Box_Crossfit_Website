"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("contact", contactSchema);
