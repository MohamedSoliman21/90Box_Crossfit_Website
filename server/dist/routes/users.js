"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controller/usersController");
const userRouter = express_1.default.Router();
userRouter.get("/", usersController_1.getAllUsers);
userRouter.get("/:id", usersController_1.getUserByID);
userRouter.post('/', usersController_1.AddUser);
userRouter.put('/:id', usersController_1.UpdateUser);
userRouter.delete('/:id', usersController_1.DeleteUser);
userRouter.post("/login", usersController_1.Login);
exports.default = userRouter;
