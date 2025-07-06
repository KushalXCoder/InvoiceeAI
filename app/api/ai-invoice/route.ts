import generateChatId from "@/lib/helper/chatId";
import connectDb from "@/lib/helper/connectDb";
import UseAI from "@/lib/helper/gemini";
import AiModel from "@/lib/models/ai.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    // eslint-disable-next-line prefer-const
    let { userInput, chatId } = await req.json();

    try {
        // Connect to database
        await connectDb();
        
        // Generate chatId
        if(chatId === "" || chatId === undefined) {
            chatId = await generateChatId();
        }
        
        console.log(userInput);
        // Save the user input to database
        await AiModel.create({
            chatId,
            sender: "user",
            content: userInput
        });

        const res = await UseAI(userInput);
        await AiModel.create({
            chatId,
            sender: "bot",
            content: res
        });

        return NextResponse.json({message: "Gemini Response", ans: res, chatId}, {status: 200});
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({message: "Error calling gemini", error}, {status: 400});
    }
}