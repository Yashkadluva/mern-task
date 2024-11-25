"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userDetailSchema = mongoose_1.default.model("userDetail", new mongoose_1.default.Schema({
    address: { type: String, required: false },
    resume: { type: String, required: true },
    userId: { type: String, required: true },
    skill: { type: Array, required: false },
    createdDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
}));
exports.default = userDetailSchema;
//# sourceMappingURL=userDetailSchema.js.map