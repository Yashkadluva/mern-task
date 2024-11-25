"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = mongoose_1.default.model("review", new mongoose_1.default.Schema({
    title: { type: String, required: true },
    ratting: { type: Number, required: true },
    student_watch: { type: Number, required: true },
    total_review: { type: Number, required: true },
    image: { type: String, required: true },
    userId: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
}));
exports.default = reviewSchema;
//# sourceMappingURL=reviewSchema.js.map