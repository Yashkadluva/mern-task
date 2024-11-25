import mongoose from "mongoose";

interface UserInterface {
    name: string;
    password: string;
    email: string;
    status: statusEnum;
    createdDate: Date;
    updateDate: Date;
}

enum statusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED",
    REQUESTED = "REQUESTED"
}

const userSchema = mongoose.model("User", new mongoose.Schema<UserInterface>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE", "DELETED", "REQUESTED"], required: true },
    createdDate: { type: Date, default: new Date() },
    updateDate: { type: Date, default: new Date() }
}));

export default userSchema;