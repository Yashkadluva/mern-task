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
exports.reviewList = exports.deleteReview = exports.updateReview = exports.createReview = exports.userSignup = exports.userLogin = void 0;
const validateKeys_1 = require("../utility/validateKeys");
const jwtUtils_1 = require("../utility/jwtUtils");
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const buffer_1 = require("buffer");
const reviewSchema_1 = __importDefault(require("../schema/reviewSchema"));
const encodeString = (data) => { if (data) {
    return (0, buffer_1.btoa)(data);
} };
const decodeString = (data) => { if (data) {
    return (0, buffer_1.atob)(data);
} };
const getCaseIgnore = (value) => { return { $regex: new RegExp('^' + value + '$', "i") }; };
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, validateKeys_1.validateKey)(req.body, ["password", "email"]);
    if (error) {
        return res.status(400).send(error);
    }
    ;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    const pass = encodeString(req.body.password);
    const userEamilData = yield userSchema_1.default.findOne({ email: getCaseIgnore(req.body.email), password: pass, status: "ACTIVE" });
    if (!userEamilData) {
        return res.status(404).send({ message: "Either email or password is incorrect" });
    }
    ;
    return res.status(200).send({ "token": (0, jwtUtils_1.generateToken)({ userId: userEamilData.id, email: userEamilData.email }), success: true, message: "Login successfully" });
});
exports.userLogin = userLogin;
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, validateKeys_1.validateKey)(req.body, ["password", "email", "name"]);
    if (error) {
        return res.status(400).send(error);
    }
    ;
    const pass = encodeString(req.body.password);
    const userEamilData = yield userSchema_1.default.findOne({ email: getCaseIgnore(req.body.email), password: pass, status: "ACTIVE" });
    if (userEamilData) {
        return res.status(400).send({ message: "Already exists" });
    }
    ;
    const user = new userSchema_1.default({
        name: req.body.name,
        email: req.body.email,
        password: pass,
        status: "ACTIVE"
    });
    yield user.save();
    return res.status(200).send({ message: "Successfully added" });
});
exports.userSignup = userSignup;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, validateKeys_1.validateKey)(req.body, ["title", "ratting", "student_watch", "total_review"]);
    if (error) {
        return res.status(400).send(error);
    }
    ;
    try {
        var fileName = req.file.filename;
        const userDetail = new reviewSchema_1.default({
            title: req.body.title,
            ratting: req.body.ratting,
            student_watch: req.body.student_watch,
            total_review: req.body.total_review,
            image: 'http://localhost:3030/' + fileName,
            userId: req.user.userId
        });
        yield userDetail.save();
        return res.status(200).send({ message: "Review added successfully" });
    }
    catch (_a) {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, validateKeys_1.validateKey)(req.body, ["title", "ratting", "student_watch", "total_review", 'id']);
    if (error) {
        return res.status(400).send(error);
    }
    ;
    const review = reviewSchema_1.default.findById(req.body.id);
    if (!review) {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
    ;
    var fileName = req.file ? req.file.filename : '';
    try {
        yield reviewSchema_1.default.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            ratting: req.body.ratting,
            student_watch: req.body.student_watch,
            total_review: req.body.total_review,
            image: fileName ? 'http://localhost:3030/' + fileName : review.image,
            userId: req.user.userId
        });
        return res.status(200).send({ message: "Review updated successfully" });
    }
    catch (_a) {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(400).send({ message: "Somthing is wrong" });
    }
    try {
        yield reviewSchema_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: "Review deleted successfully" });
    }
    catch (_a) {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
});
exports.deleteReview = deleteReview;
const reviewList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewList = yield reviewSchema_1.default.find({ userId: req.user.userId });
        return res.status(200).send({ list: reviewList });
    }
    catch (_a) {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
});
exports.reviewList = reviewList;
//# sourceMappingURL=onboarding.js.map