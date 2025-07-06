import { nanoid } from "nanoid";
import AiModel from "../models/ai.model";

const generateChatId = async () => {
    let chatId;
    let isUnique = false;

    while(!isUnique) {
        const id = `chat-${nanoid(6)}`;

        const check = await AiModel.findOne({chatId: id});
        if(!check) {
            isUnique = true;
            chatId = id;
        }

        return chatId;
    }
}

export default generateChatId;