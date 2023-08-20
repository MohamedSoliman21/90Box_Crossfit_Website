"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teamController_1 = require("../controller/teamController");
const upload_1 = __importDefault(require("../middlewares/upload"));
const teamRouter = express_1.default.Router();
teamRouter.get("/", teamController_1.getAllTeam);
teamRouter.get("/:id", teamController_1.getTeamByID);
teamRouter.post('/', upload_1.default.single("Image"), teamController_1.AddTeam);
teamRouter.put('/:id', upload_1.default.single("Image"), teamController_1.UpdateTeam);
teamRouter.delete('/:id', teamController_1.DeleteTeam);
exports.default = teamRouter;
