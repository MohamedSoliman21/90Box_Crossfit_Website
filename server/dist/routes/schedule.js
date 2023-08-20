"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scheduleController_1 = require("../controller/scheduleController");
const upload_1 = __importDefault(require("../middlewares/upload"));
const scheduleRouter = express_1.default.Router();
scheduleRouter.get("/", scheduleController_1.getAllSchedule);
scheduleRouter.get("/:id", scheduleController_1.getScheduleByID);
scheduleRouter.post('/', upload_1.default.single("Image"), scheduleController_1.AddSchedule);
scheduleRouter.put('/:id', upload_1.default.single("Image"), scheduleController_1.UpdateSchedule);
scheduleRouter.delete('/:id', scheduleController_1.DeleteSchedule);
exports.default = scheduleRouter;
