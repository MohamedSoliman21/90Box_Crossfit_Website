"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MongoConnect = async () => {
    mongoose_1.default.connect('mongodb+srv://90Box:90Box@90box.5v3ec0k.mongodb.net/90Box?retryWrites=true&w=majority', {}).then(() => {
        console.log('Connected to MongoDB Atlas');
    })
        .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
};
exports.MongoConnect = MongoConnect;
