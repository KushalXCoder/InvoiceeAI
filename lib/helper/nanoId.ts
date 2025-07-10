import { nanoid } from "nanoid";
import connectDb from "./connectDb";
import Invoice from "../models/invoice.model";

export const getNanoId = async () => {
    let invoiceId;
    let isUnique = false;

    while(!isUnique) {
        await connectDb();
        const id = `INV-${nanoid(6)}`;
        const check = await Invoice.findOne({invoiceId: id});
        if(!check) {
            invoiceId = id;
            isUnique = true;
        }
    }

    return invoiceId;
}