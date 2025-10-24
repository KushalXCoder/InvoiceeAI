import connectDb from "@/lib/helper/connectDb";
import { generateInvoiceBlob } from "@/lib/helper/generatePdf";
import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
    // Getting data from the request
    const { email, id } = await req.json();

    try {
        // Connect to databse
        await connectDb();

        // Find the invoice
        const invoice = await Invoice.findOne({"invoiceInfo.invoiceId": id});
        if(!invoice) {
            return NextResponse.json({message: "Invoice not found"}, {status: 400});
        }

        // Get the pdf buffer to be sent to mail
        const blob = await generateInvoiceBlob(invoice.invoiceInfo, invoice.itemsData);
        const arrayBuffer = await blob.arrayBuffer();
        const pdfContent = Buffer.from(arrayBuffer);

        // Creating a transpoter
        const transpoter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS,
            }
        });

        // Sending the mail
        await transpoter.sendMail({
            from: `"InvoiceeAI" <${process.env.MAIL_ID}>`,
            to: email,
            subject: "Reminder to pay the invoice amount",
            text: `This is an reminder email from InvoiceeAI to pay the amount, given in the invoice attached below to ${invoice.invoiceInfo.companyName} before ${invoice.invoiceInfo.dueDate}. If, you have any issues, please contact the company regarding it. We are just an invoice generating and managing platform. Thanks for your cooperation.`,
            attachments: [
                {
                    filename: 'invoice.pdf',
                    content: pdfContent,
                    contentType: 'application/pdf',
                }
            ],
        });

        return NextResponse.json({message: "Email sent"}, {status: 200});
    } catch (error) {
        console.error("Error sending email", error);
        return NextResponse.json({message: "Error sending email", error}, {status: 400});
    }
}