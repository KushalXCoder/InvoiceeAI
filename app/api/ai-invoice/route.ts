import generateChatId from "@/lib/helper/chatId";
import connectDb from "@/lib/helper/connectDb";
import UseAI from "@/lib/helper/gemini";
import AiModel from "@/lib/models/ai.model";
import { NextRequest, NextResponse } from "next/server";

interface Chats {
    sender: string,
    content: string,
}

export const POST = async(req: NextRequest) => {
    // eslint-disable-next-line prefer-const
    let { userInput, chatId } = await req.json();

    try {
        if(!userInput) {
            return NextResponse.json({message: "No input provided"}, {status: 400});
        }

        // Connect to database
        await connectDb();
        
        // Generate chatId
        if(chatId === "" || chatId === undefined) {
            chatId = await generateChatId();
        }
        
        // Save the user input to database
        await AiModel.create({
            chatId,
            sender: "user",
            content: userInput
        });

        const chatHistory = await AiModel.find({ chatId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("sender content")
        .lean<Chats[]>();

        console.log(chatHistory);

        const res = await UseAI(userInput, chatHistory);
        await AiModel.create({
            chatId,
            sender: "bot",
            content: res
        });

        return NextResponse.json({message: "Gemini Response", ans: res, chatId, chatHistory: chatHistory}, {status: 200});
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({message: "Error calling gemini", error}, {status: 400});
    }
}