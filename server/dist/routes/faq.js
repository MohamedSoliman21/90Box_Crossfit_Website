"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faqController_1 = require("../controller/faqController");
const faqRouter = express_1.default.Router();
faqRouter.get("/", faqController_1.getAllFaqs);
faqRouter.post('/', faqController_1.AddFaq);
faqRouter.put('/:id', faqController_1.UpdateFaq);
faqRouter.delete('/:id', faqController_1.DeleteFaq);
exports.default = faqRouter;
