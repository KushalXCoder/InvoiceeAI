import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "@/lib/helper/connectDb";
import { getNanoId } from "@/lib/helper/nanoId";
import { cookies } from "next/headers";
import verifyToken from "@/lib/helper/verifyToken";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to db
    await connectDb();

    // email variable
    let email;

    // Get session and data
    const session = await auth();
    email = session?.user?.email;

    // Get email from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if(token) {
      const payload = (await verifyToken(token ?? "")).payload;
      email = payload?.email;
    }

    const { data, itemsData, totalAmount, isInvoiceChanged, isItemsChanged } = await req.json();

    const { ...safeData } = data;

    if(data.invoiceId === "" || data.invoiceId === undefined || data.invoiceId === null) {
      const id = await getNanoId();
      console.log(id);
      const invoice = await Invoice.create({
        invoiceInfo: {
          ...safeData,
          invoiceId: id,
        },
        user: email,
        itemsData,
        finalAmount: totalAmount,
      });

      return NextResponse.json({ message: "Invoice added", invoice }, { status: 200 });
    }

    if(isInvoiceChanged || isItemsChanged) {
      console.log(data.invoiceId);
      const invoice = await Invoice.findOne({ "invoiceInfo.invoiceId": data.invoiceId });
      if(isInvoiceChanged) {
        Object.assign(invoice.invoiceInfo, safeData);
      }
      else {
        console.log(itemsData);
        invoice.itemsData = itemsData;
        invoice.finalAmount = totalAmount;
      }
      await invoice.save();
      return NextResponse.json({ message: "Invoice Saved", invoice }, { status: 200 });
    }

    // If no changes return
    else {
      return NextResponse.json({ message: "No changes detected" }, { status: 200 });
    }

  } catch (error) {
    console.error("Error saving invoice", error);
    return NextResponse.json({ message: "Error saving invoice", error }, { status: 400 });
  }
};