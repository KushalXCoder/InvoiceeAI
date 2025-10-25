import { JwtPayload } from "jsonwebtoken";

export {};

declare global {
    type ItemsData = {
        itemsDescription: string,
        qty: number | null,
        rate: number | null,
        igst: number | null,
        cgst: number | null,
        sgst: number | null,
        cess: number | null,
        amount: number | null,
    }
    
    type InvoiceInfo = {
      invoiceId: string,
      invoiceNumber: string,
      orderDate: string,
      dueDate: string | null,
      companyName: string,
      address1: string,
      address2: string,
      address3: string,
      billToName: string,
      billToAddress1: string,
      billToAddress2: string,
      billToAddress3: string,
      notes: string,
      tnc: string,
    }

    type InvoiceData = {
      finalAmount: number,
      invoiceInfo: InvoiceInfo,
      itemsData: ItemsData[],
      status: string,
      user: string,
      createdAt: string,
    }
    
    type dataType = {
      _id: string,
      user: string,
      invoiceInfo: InvoiceInfo,
      itemsData: ItemsData[],
      finalAmount: number,
      status: string,
    }

    interface MyPayloadData extends JwtPayload {
      email: string;
      name: string;
    };

    type UserInvoiceInfo = {
      finalAmount: number,
      invoiceInfo: InvoiceInfo,
      itemsData: ItemsData[],
      status: string,
      user: string,
    }

    type AiItemData = {
        item_description: string | "",
        quantity: number | null,
        unit_price: number | null,
        igst: number | null,
        cgst: number | null,
        sgst: number | null,
        cess: number | null,
        line_total: number | null,
    }

    interface VerifyTokenResult {
        valid: boolean;
        expired: boolean;
        payload?: MyPayloadData;
        error?: Error;
    }
}