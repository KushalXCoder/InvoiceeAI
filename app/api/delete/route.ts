import connectDb from "@/lib/helper/connectDb";
import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    // Get id from request
    const { id } = await req.json();
    try {
        // Connecting to database
        await connectDb();

        // Deleting Invoice
        const deleteRes = await Invoice.deleteOne({"invoiceInfo.invoiceId": id});
        if(!deleteRes.acknowledged) {
            return NextResponse.json({message: "Invoice not found"}, {status: 400});
        }
        return NextResponse.json({message: "Invoice deleted successfully", deleteRes}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error deleting invoice", error}, {status: 400});
    }
}