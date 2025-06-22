import mongoose from "mongoose";

const connectDb = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.error("Error connecting to mongodb", error);
    }
}

export default connectDb;