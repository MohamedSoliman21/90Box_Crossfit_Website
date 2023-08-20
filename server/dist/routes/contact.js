"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controller/contactController");
const contactRouter = express_1.default.Router();
contactRouter.get("/", contactController_1.getAllContacts);
contactRouter.get("/:id", contactController_1.getContactByID);
contactRouter.post('/', contactController_1.AddContact);
contactRouter.delete('/:id', contactController_1.DeleteContact);
exports.default = contactRouter;
