import connectDb from "@/lib/helper/connectDb";
import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
    try {
        // Connecting to database
        await connectDb();

        // Getting data from request
        const { statusName, id } = await req.json();

        // Find invoice by id
        const invoice = await Invoice.findOne({invoiceId: id});
        if(!invoice) {
            return NextResponse.json({message: "Invoice not found"}, {status: 400});
        }

        // Check if invoice state is same
        if(invoice.status === statusName) {
            return NextResponse.json({message: "Invoice status is same"}, {status: 400});
        }

        // Else change state of the invoice
        invoice.status = statusName;
        await invoice.save();

        return NextResponse.json({message: "Invoice status changed", invoice}, {status: 200});
    } catch (error) {
        console.log("Error changing invoice state", error);
        return NextResponse.json({message: "Error changing invoice status", error}, {status: 400});
    }
}