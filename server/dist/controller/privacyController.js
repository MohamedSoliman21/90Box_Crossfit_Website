"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePolicy = exports.UpdatePolicy = exports.AddPrivacy = exports.getAllPrivacy = void 0;
const privacy_1 = __importDefault(require("../models/privacy"));
const getAllPrivacy = async (req, res) => {
    try {
        const AllPolicies = await privacy_1.default.find({});
        res.json(AllPolicies);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving Policies' });
    }
};
exports.getAllPrivacy = getAllPrivacy;
const AddPrivacy = async (req, res) => {
    try {
        const policy = await privacy_1.default.create(req.body);
        res.status(201).json(policy);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Adding Policy' });
    }
};
exports.AddPrivacy = AddPrivacy;
const UpdatePolicy = async (req, res) => {
    try {
        const policy = await privacy_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.json(policy);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Updating Policy' });
    }
};
exports.UpdatePolicy = UpdatePolicy;
const DeletePolicy = async (req, res) => {
    try {
        const policy = await privacy_1.default.findByIdAndDelete(req.params.id);
        res.json(policy);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while Deleting Policy' });
    }
};
exports.DeletePolicy = DeletePolicy;
