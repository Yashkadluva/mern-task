import { validateKey } from "../utility/validateKeys";
import { generateToken } from "../utility/jwtUtils";
import userSchema from "../schema/userSchema";
import { atob, btoa } from "buffer";
import reviewSchema from "../schema/reviewSchema";
const encodeString = (data: any) => { if (data) { return btoa(data) } };
const decodeString = (data: any) => { if (data) { return atob(data) } };
const getCaseIgnore = (value: String) => { return { $regex: new RegExp('^' + value + '$', "i") } };

export const userLogin = async (req: any, res: any) => {
    const error = validateKey(req.body, ["password", "email"]);
    if (error) { return res.status(400).send(error); };
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.get('User-Agent');
    const pass = encodeString(req.body.password);
    const userEamilData: any = await userSchema.findOne({ email: getCaseIgnore(req.body.email), password: pass, status: "ACTIVE" });
    if (!userEamilData) { return res.status(404).send({ message: "Either email or password is incorrect" }) };
    return res.status(200).send({ "token": generateToken({ userId: userEamilData.id, email: userEamilData.email }), success: true, message: "Login successfully" });
};

export const userSignup = async (req: any, res: any) => {
    const error = validateKey(req.body, ["password", "email", "name"]);
    if (error) { return res.status(400).send(error); };
    const pass = encodeString(req.body.password);
    const userEamilData: any = await userSchema.findOne({ email: getCaseIgnore(req.body.email), password: pass, status: "ACTIVE" });
    if (userEamilData) { return res.status(400).send({ message: "Already exists" }) };
    const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: pass,
        status: "ACTIVE"
    });
    await user.save();
    return res.status(200).send({ message: "Successfully added" })
};

export const createReview = async (req: any, res: any) => {
    const error = validateKey(req.body, ["title", "ratting", "student_watch", "total_review"]);
    if (error) { return res.status(400).send(error); };
    try {
        var fileName = req.file.filename;
        const userDetail = new reviewSchema({
            title: req.body.title,
            ratting: req.body.ratting,
            student_watch: req.body.student_watch,
            total_review: req.body.total_review,
            image: 'http://localhost:3030/' + fileName,
            userId: req.user.userId
        });
        await userDetail.save();
        return res.status(200).send({ message: "Review added successfully" });
    } catch {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
};

export const updateReview = async (req: any, res: any) => {
    const error = validateKey(req.body, ["title", "ratting", "student_watch", "total_review", 'id']);
    if (error) { return res.status(400).send(error); };
    const review: any = reviewSchema.findById(req.body.id);
    if (!review) { return res.status(400).send({ message: "Somthing went wrong" }); };
    var fileName = req.file ? req.file.filename : '';
    try {
        await reviewSchema.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            ratting: req.body.ratting,
            student_watch: req.body.student_watch,
            total_review: req.body.total_review,
            image: fileName ? 'http://localhost:3030/' + fileName : review.image,
            userId: req.user.userId
        })
        return res.status(200).send({ message: "Review updated successfully" });
    } catch {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
};

export const deleteReview = async (req: any, res: any) => {
    if (!req.params.id) {
        return res.status(400).send({ message: "Somthing is wrong" });
    }
    try {
        await reviewSchema.findByIdAndDelete(req.params.id)
        return res.status(200).send({ message: "Review deleted successfully" });
    } catch {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
};

export const reviewList = async (req: any, res: any) => {
    try {
        const reviewList: any = await reviewSchema.find({ userId: req.user.userId })
        return res.status(200).send({ list: reviewList });
    } catch {
        return res.status(400).send({ message: "Somthing went wrong" });
    }
};