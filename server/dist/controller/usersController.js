"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.AddUser = exports.Login = exports.getUserByID = exports.getAllUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const getAllUsers = async (req, res) => {
    try {
        const AllUsers = await users_1.default.find({});
        res.json(AllUsers);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving users' });
    }
};
exports.getAllUsers = getAllUsers;
const getUserByID = async (req, res) => {
    try {
        const Users = await users_1.default.findById(req.params.id);
        res.json(Users);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving User' });
    }
};
exports.getUserByID = getUserByID;
const Login = async (req, res) => {
    const { Email, Password } = req.body;
    console.log(req.body);
    const user = await users_1.default.findOne({ Email }).exec();
    if (!user) {
        res.json({ error: "Account doesn't exist" });
    }
    else {
        bcrypt_1.default.compare(Password, user.Password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Email or Password" });
            }
            else {
                const accessToken = (0, jsonwebtoken_1.sign)({ Name: user.Name, Email: user.Email, id: user.id }, "TopSecret");
                res.json({ Token: accessToken, Name: user.Name, id: user.id });
            }
        });
    }
};
exports.Login = Login;
const AddUser = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        const User = await bcrypt_1.default.hash(Password, 10).then((hash) => {
            users_1.default.create({
                Name: Name,
                Email: Email,
                Password: hash
            });
        });
        res.status(201).json(User);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding career' });
    }
};
exports.AddUser = AddUser;
const UpdateUser = async (req, res) => {
    try {
        const User = await users_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(User);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating career' });
    }
};
exports.UpdateUser = UpdateUser;
const DeleteUser = async (req, res) => {
    try {
        const User = await users_1.default.findByIdAndDelete(req.params.id);
        res.json(User);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting career' });
    }
};
exports.DeleteUser = DeleteUser;
