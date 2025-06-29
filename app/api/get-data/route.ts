import connectDb from "@/lib/helper/connectDb";
import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { email } = await req.json();
    try {
        // Connect Database
        await connectDb();

        // Find Invoice
        const invoices = await Invoice.find({ user : email });
        if(!invoices) {
            return NextResponse.json({message: "No invoice found", data: {}}, {status: 200});
        }

        return NextResponse.json({message: "Invoice found", invoices}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error finding invoices", error}, {status: 400});
    }
}