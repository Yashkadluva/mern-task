"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const secretKey = 'yourSecretKey'; // Replace with your own secret key
    const options = { expiresIn: '24h' };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=jwtUtils.js.map