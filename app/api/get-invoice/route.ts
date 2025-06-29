import connectDb from "@/lib/helper/connectDb";
import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        // Get id from request
        const {id} = await req.json();
        if(!id) {
            return NextResponse.json({message: "Id not found"}, {status: 400});
        }
        // Connect database
        await connectDb();

        // Find invoice
        const invoice = await Invoice.findOne({invoiceId: id});
        if(!invoice) {
            return NextResponse.json({message: "Invoice not found with this id"}, {status: 400});
        }

        return NextResponse.json({message: "Invoice foound successfully", invoice}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error fetching invoice", error}, {status: 400});
    }
}