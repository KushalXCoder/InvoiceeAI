import connectDb from "@/lib/helper/connectDb";
import AiModel from "@/lib/models/ai.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    // Get the chatId
    const { chatId } = await req.json();

    try {
        // Connect to database
        await connectDb();

        // Find the chats by chatId
        const chats = await AiModel.find({chatId: chatId});
        if(chats.length === 0) {
            return NextResponse.json({message: "No chats found"}, {status: 400});
        }

        return NextResponse.json({message: "Chats found successfully", chats}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Error fetching chats', error}, {status: 400});
    }
}