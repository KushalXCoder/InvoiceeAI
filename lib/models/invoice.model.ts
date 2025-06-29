import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
    },
    invoiceNumber: {
        type: String,
    },
    orderDate: {
        type: String,
    },
    dueDate: {
        type: String,
    },
    user: {
        type: String,
    },
    companyName: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    address3: {
        type: String,
    },
    billToName: {
        type: String,
    },
    billToAddress1: {
        type: String,
    },
    billToAddress2: {
        type: String,
    },
    billToAddress3: {
        type: String,
    },
    notes: {
        type: String,
    },
    tnc: {
        type: String,
    },
    finalAmount: {
        type: Number,
    },
    itemsData: {
        type: [Schema.Types.Mixed],
        default: [],
    },
    status: {
        type: String,
        default: "Pending",
    },
    url: {
        type: String,
    }
});

const Invoice = mongoose.models?.Invoice || mongoose.model('Invoice', InvoiceSchema);
export default Invoice;