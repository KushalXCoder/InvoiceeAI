import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import RobotoFont from "@/lib/helper/Roboto-Regular";
import { useItemsStore } from '@/store/itemsStore';

type InvoiceData = {
    companyName: string,
    logo: File | null,
    address1: string,
    address2: string,
    address3: string,
    billToName: string,
    billToAddress1: string,
    billToAddress2: string,
    billToAddress3: string,
    notes: string,
    tnc: string,
};

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

export const generatePdf = (finalData : InvoiceData, itemsData: ItemsData[]) => {

  const { findTotal } = useItemsStore.getState();

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  doc.addFileToVFS("Roboto-Regular.ttf", RobotoFont);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal");

  const margin = 40;
  let y = margin;

  // ==== Company Info ====
  doc.setFontSize(14).setFont("Roboto", "bold");
  doc.text(`${finalData.companyName}`, margin, y);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.address1}`, margin, y += 18);
  doc.text(`${finalData.address2}`, margin, y += 14);
  doc.text(`${finalData.address3}`, margin, y += 14);

  // ==== Invoice Info (Right Aligned) ====
  doc.setFont("Roboto", "bold").setFontSize(20);
  doc.text("INVOICE", 515, margin, { align: 'right' });

  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text("Invoice No: 123432", 515, margin + 25, { align: 'right' });
  doc.text("Order Date: 22/06/2025", 515, margin + 40, { align: 'right' });
  doc.text("Delivery Date: 22/07/2025", 515, margin + 55, { align: 'right' });

  // ==== Bill To ====
  y += 50;
  doc.setFont("Roboto", "bold").setFontSize(13);
  doc.text("Bill To", margin, y += 15);
  doc.setFont("Roboto", "bold").setFontSize(11);
  doc.text(`${finalData.billToName}`, margin, y += 18);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.billToAddress1}`, margin, y += 14);
  doc.text(`${finalData.billToAddress2}`, margin, y += 14);
  doc.text(`${finalData.billToAddress3}`, margin, y += 14);

  // ==== Item Table ====
  const headers = [["Item", "Qty", "Rate", "IGST%", "CGST%", "SGST%", "CESS%", "Amount"]];

  // Converting each object inside the array to an array, as the row requires array
  const rows = itemsData.map(item => [
    item.itemsDescription,
    item.qty ?? '',
    item.rate ?? '',
    item.igst ?? '',
    item.cgst ?? '',
    item.sgst ?? '',
    item.cess ?? '',
    item.amount ?? ''
  ]);

  autoTable(doc, {
    startY: y + 30,
    head: headers,
    body: rows,
    styles: {
      font: 'Roboto',
      fontSize: 10,
      halign: 'center',
      valign: 'middle',
      cellPadding: 6,
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [240, 240, 240], // Light gray
      textColor: 20,
      fontStyle: 'bold'
    },
    theme: 'grid',
    margin: { left: margin, right: margin },
  });

  const finalY = doc.lastAutoTable.finalY;

  // ==== Totals Table (Styled & Right-Aligned) ====
  autoTable(doc, {
    startY: finalY + 30,
    head: [["Particular", "Amount"]],
    body: [
      ["Subtotal", `₹${findTotal("rate")}`],
      ["IGST", `₹${findTotal("igst")}`],
      ["CGST", `₹${findTotal("cgst")}`],
      ["SGST", `₹${findTotal("sgst")}`],
      ["CESS", `₹${findTotal("cess")}`],
      [
        { content: "Total Amount", styles: { font: 'Roboto', fontStyle: 'bold', textColor: [0, 80, 180] } },
        { content: `₹${findTotal("amount")}`, styles: { font: 'Roboto', fontStyle: 'bold', textColor: [0, 80, 180] } }
      ]
    ],
    styles: {
      font: 'Roboto',
      fontSize: 11,
      halign: 'right',
      valign: 'middle',
      cellPadding: 6,
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [240, 240, 240], // Gray header
      textColor: 20,
      fontStyle: 'bold'
    },
    theme: 'grid',
    margin: { left: 340, right: margin },
    tableWidth: 200
  });

  // ==== Notes ====
  const notesY = doc.lastAutoTable.finalY + 40;
  doc.setFont("Roboto", "bold").setFontSize(13);
  doc.text('Notes', margin, notesY);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.notes}`, margin, notesY + 16, { maxWidth: 500 });

  // ==== Terms and Conditions ====
  const termsY = notesY + 140;
  doc.setFont("Roboto", "bold").setFontSize(13);
  doc.text('Terms and Conditions', margin, termsY);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.tnc}`, margin, termsY + 16, { maxWidth: 500 });

  // ==== Save ====
  doc.save('invoice.pdf');
}