"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const ValidateToken = (req, res, next) => {
    const accessToken = req.header('accessToken');
    if (!accessToken) {
        return res.json({ error: 'User not logged in' });
    }
    try {
        const validToken = (0, jsonwebtoken_1.verify)(accessToken, 'Secret');
        req.user = validToken;
        if (validToken) {
            return next();
        }
    }
    catch (error) {
        return res.json({ error: error });
    }
};
exports.default = ValidateToken;
