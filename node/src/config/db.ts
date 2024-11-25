import mongoose from "mongoose";

const connection = async () => {
    const url: any = process.env.URL;
    try {
        await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true } as any);
        console.log("Data Base Connected");
    }
    catch (error) {
        console.log("Error In Data Base", error);
    }
};

export default connection;