import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        trime: true,
    },
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;