"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const programsController_1 = require("../controller/programsController");
const upload_1 = __importDefault(require("../middlewares/upload"));
const programsRouter = express_1.default.Router();
programsRouter.get("/", programsController_1.getAllPrograms);
programsRouter.get("/:id", programsController_1.getProgramByID);
programsRouter.post('/', upload_1.default.single("Image"), programsController_1.AddProgram);
programsRouter.put('/:id', upload_1.default.single("Image"), programsController_1.UpdateProgram);
programsRouter.delete('/:id', programsController_1.DeleteProgram);
exports.default = programsRouter;
