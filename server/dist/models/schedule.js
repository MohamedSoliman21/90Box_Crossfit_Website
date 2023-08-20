"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("schedule", ScheduleSchema);
