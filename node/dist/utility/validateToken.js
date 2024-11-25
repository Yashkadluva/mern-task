"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization") ? req.header("Authorization").replaceAll('Bearer ', "") : null;
    if (token) {
        jsonwebtoken_1.default.verify(token, 'yourSecretKey', (err, payload) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            else {
                req.user = payload;
                next();
            }
        });
    }
    else {
        res.status(401).json({ success: false, message: 'Token is not provided' });
    }
});
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map