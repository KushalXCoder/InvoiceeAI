import UseAI from "@/lib/helper/gemini";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const { userInput } = await req.json();
    try {
        const res = await UseAI(userInput);
        return NextResponse.json({message: "Gemini Response", ans: res}, {status: 200});
    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({message: "Error calling gemini", error}, {status: 400});
    }
}