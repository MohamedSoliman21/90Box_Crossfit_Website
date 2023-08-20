"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const termsController_1 = require("../controller/termsController");
const termsRouter = express_1.default.Router();
termsRouter.get("/", termsController_1.getAllTerms);
termsRouter.post('/', termsController_1.AddTerm);
termsRouter.put('/:id', termsController_1.UpdateTerm);
termsRouter.delete('/:id', termsController_1.DeleteTerm);
exports.default = termsRouter;
