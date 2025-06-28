import Invoice from "@/lib/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "@/lib/helper/connectDb";

// Comparing itemsData stored in db, and itesData getting from the request
function areItemsEqual(a: unknown[], b: unknown[]) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;

  return a.every((item, index) => {
    return JSON.stringify(item) === JSON.stringify(b[index]);
  });
}

export const POST = async (req: NextRequest) => {
  try {
    // Connect to db
    await connectDb();

    // Get session and data
    const session = await auth();
    const { data, itemsData } = await req.json();

    // Store the data in updates object
    const updates: { [key: string]: unknown } = {
      companyName: data.companyName,
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
      billToCompany: data.billToCompany,
      billToAddress1: data.billToAddress1,
      billToAddress2: data.billToAddress2,
      billToAddress3: data.billToAddress3,
      notes: data.notes,
      tnc: data.tnc,
    };

    const invoice = await Invoice.findOne({ invoiceId: data.invoiceId });

    // Create new invoice if not exists
    if (!invoice) {
      const newInvoice = await Invoice.create({
        invoiceId: data.invoiceId,
        user: session?.user?.email,
        ...updates,
        itemsData,
      });

      return NextResponse.json({ message: "Invoice added", newInvoice }, { status: 200 });
    }

    // Check if any fields or items have changed
    let isDiff = false;
    for (const key in updates) {
      if (invoice[key] !== updates[key]) {
        isDiff = true;
        break;
      }
    }
    const itemsChanged = !areItemsEqual(invoice.itemsData || [], itemsData || []);

    // If no changes return
    if (!isDiff && !itemsChanged) {
      return NextResponse.json({ message: "No changes detected" }, { status: 200 });
    }

    // Make changes in db
    Object.assign(invoice, updates);
    if (itemsChanged) invoice.itemsData = itemsData;
    await invoice.save();

    return NextResponse.json({ message: "Invoice Saved", invoice }, { status: 200 });

  } catch (error) {
    console.error("Error saving invoice", error);
    return NextResponse.json({ message: "Error saving invoice", error }, { status: 400 });
  }
};