"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const privacyController_1 = require("../controller/privacyController");
const privacyRouter = express_1.default.Router();
privacyRouter.get("/", privacyController_1.getAllPrivacy);
privacyRouter.post('/', privacyController_1.AddPrivacy);
privacyRouter.put('/:id', privacyController_1.UpdatePolicy);
privacyRouter.delete('/:id', privacyController_1.DeletePolicy);
exports.default = privacyRouter;
