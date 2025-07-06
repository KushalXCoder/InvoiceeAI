import mongoose from "mongoose";

const AiSchema = new mongoose.Schema({
    chatId: {
        type: String,
    },
    sender: {
        type: String,
    },
    content: {
        type: String,
    }
}, { timestamps: true });

const AiModel = mongoose.models?.AiModel || mongoose.model("AiModel", AiSchema);
export default AiModel;