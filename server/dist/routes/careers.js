"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const careersController_1 = require("../controller/careersController");
const careersRouter = express_1.default.Router();
careersRouter.get("/", careersController_1.getAllCareers);
careersRouter.get("/:id", careersController_1.getCareerByID);
careersRouter.post('/', careersController_1.AddCareer);
careersRouter.put('/:id', careersController_1.UpdateCareer);
careersRouter.delete('/:id', careersController_1.DeleteCareer);
exports.default = careersRouter;
