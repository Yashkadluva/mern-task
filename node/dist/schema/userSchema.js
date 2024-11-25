"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var statusEnum;
(function (statusEnum) {
    statusEnum["ACTIVE"] = "ACTIVE";
    statusEnum["INACTIVE"] = "INACTIVE";
    statusEnum["DELETED"] = "DELETED";
    statusEnum["REQUESTED"] = "REQUESTED";
})(statusEnum || (statusEnum = {}));
const userSchema = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE", "DELETED", "REQUESTED"], required: true },
    createdDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
}));
exports.default = userSchema;
//# sourceMappingURL=userSchema.js.map