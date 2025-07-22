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

export const generatePdf = (finalData : InvoiceData, itemsData: ItemsData[], type: string) => {
  const { findTotal } = useItemsStore.getState();

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  doc.addFileToVFS("Roboto-Regular.ttf", RobotoFont);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal");

  const margin = 40;
  let y = margin;

  // ==== Company Info ====
  doc.setFontSize(14).setFont("Roboto");
  doc.text(`${finalData.companyName}`, margin, y);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.address1}`, margin, y += 18);
  doc.text(`${finalData.address2}`, margin, y += 14);
  doc.text(`${finalData.address3}`, margin, y += 14);

  // ==== Invoice Info ====
  const rightEdgeX = doc.internal.pageSize.getWidth() - margin;

  doc.setFont("Roboto").setFontSize(20);
  doc.text("INVOICE", rightEdgeX, margin, { align: 'right' });

  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text("Invoice No: 123432", rightEdgeX, margin + 25, { align: 'right' });
  doc.text("Order Date: 22/06/2025", rightEdgeX, margin + 40, { align: 'right' });
  doc.text("Delivery Date: 22/07/2025", rightEdgeX, margin + 55, { align: 'right' });

  // ==== Bill To ====
  y += 50;
  doc.setFont("Roboto").setFontSize(13);
  doc.text("Bill To", margin, y += 15);
  doc.setFont("Roboto").setFontSize(11);
  doc.text(`${finalData.billToName}`, margin, y += 18);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.billToAddress1}`, margin, y += 14);
  doc.text(`${finalData.billToAddress2}`, margin, y += 14);
  doc.text(`${finalData.billToAddress3}`, margin, y += 14);

  // ==== Item Table ====
  const headers = [["Item", "Qty", "Rate", "IGST%", "CGST%", "SGST%", "CESS%", "Amount"]];
  const rows = itemsData.map(item => [
    item.itemsDescription,
    item.qty ?? '',
    `₹${item.rate ?? 0}`,
    `${item.igst ?? 0}%`,
    `${item.cgst ?? 0}%`,
    `${item.sgst ?? 0}%`,
    `${item.cess ?? 0}%`,
    `₹${item.amount ?? 0}`
  ]);

  autoTable(doc, {
    startY: y + 30,
    head: headers,
    body: rows,
    styles: {
      font: 'Roboto',
      fontStyle: "normal",
      fontSize: 10,
      valign: 'middle',
      cellPadding: 6,
      lineWidth: 0.2
    },
    bodyStyles: {
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'left' }, // Item name left-aligned
      7: { halign: 'right' } // Amount right-aligned
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: 20,
    },
    theme: 'grid',
    margin: { left: margin, right: margin },
  });

  const finalY = doc.lastAutoTable.finalY;

  // ==== Totals Table ====
  const tax = findTotal("igst") + findTotal("cgst") + findTotal("sgst") + findTotal("cess");

  autoTable(doc, {
    startY: finalY + 20,
    head: [["Particular", "Amount"]],
    body: [
      ["Subtotal", `₹${findTotal("rate")}`],
      ["Tax", `₹${tax}`],
      // ["IGST", `₹${findTotal("igst").toFixed(2)}`],
      // ["CGST", `₹${findTotal("cgst").toFixed(2)}`],
      // ["SGST", `₹${findTotal("sgst").toFixed(2)}`],
      // ["CESS", `₹${findTotal("cess").toFixed(2)}`],
      [
        { content: "Total Amount", styles: { textColor: [0, 80, 180] } },
        { content: `₹${findTotal("amount")}`, styles: { textColor: [0, 80, 180] } }
      ]
    ],
    styles: {
      font: 'Roboto',
      fontSize: 11,
      halign: 'right',
      valign: 'middle',
      fontStyle: "normal",
      cellPadding: 6,
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: 20,
    },
    theme: 'grid',
    margin: { left: doc.internal.pageSize.getWidth() - margin - 200, right: margin },
    tableWidth: 200
  });

  // ==== Notes ====
  const notesY = doc.lastAutoTable.finalY + 40;
  doc.setFont("Roboto").setFontSize(13);
  doc.text('Notes', margin, notesY);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.notes}`, margin, notesY + 16, { maxWidth: 500 });

  // ==== Terms and Conditions ====
  const termsY = notesY + 80;
  doc.setFont("Roboto").setFontSize(13);
  doc.text('Terms and Conditions', margin, termsY);
  doc.setFont("Roboto", "normal").setFontSize(10);
  doc.text(`${finalData.tnc}`, margin, termsY + 16, { maxWidth: 500 });

  // ==== Issued By / Powered By Footer ====
  const footerY = termsY + 70;
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont("Roboto").setFontSize(10).setTextColor(150);
  doc.text("Issued By", margin, footerY);
  doc.text("Powered By", pageWidth - margin - doc.getTextWidth("Powered By"), footerY);

  doc.setFont("Roboto").setFontSize(14).setTextColor(160);
  doc.text(`${finalData.companyName}`, margin, footerY + 20);
  doc.text("InvoiceeAI", pageWidth - margin - doc.getTextWidth("InvoiceeAI"), footerY + 20);

  // ==== Save or Return PDF ====
  if (type === "save") {
    doc.save('invoice.pdf');
  } else {
    const pdfBuffer = doc.output("arraybuffer");
    return Buffer.from(pdfBuffer);
  }
};