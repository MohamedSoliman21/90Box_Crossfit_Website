"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const botController_1 = require("../controller/botController");
const botRouter = express_1.default.Router();
botRouter.get("/", botController_1.getAllMessages);
botRouter.post('/', botController_1.AddMessage);
botRouter.put('/:id', botController_1.UpdateMessage);
botRouter.delete('/:id', botController_1.DeleteMessage);
exports.default = botRouter;
