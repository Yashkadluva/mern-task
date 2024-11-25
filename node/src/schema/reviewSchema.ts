import mongoose from "mongoose";

interface reviewInterface {
    title: string;
    ratting: number;
    student_watch: number;
    total_review: number;
    image: string;
    userId: string;
    createdDate: Date;
    updateDate: Date;
}


const reviewSchema = mongoose.model("review", new mongoose.Schema<reviewInterface>({
    title: { type: String, required: true },
    ratting: { type: Number, required: true },
    student_watch: { type: Number, required: true },
    total_review: { type: Number, required: true },
    image: { type: String, required: true },
    userId: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
}));

export default reviewSchema;