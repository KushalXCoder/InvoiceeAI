/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import { useItemsStore } from '@/store/itemsStore';

// Register a font that supports Unicode
// Check if running in Node.js (server) or browser
if (typeof window === "undefined") {
  // ✅ We're in Node.js (Next.js server)
  const fs = require("fs"); // use require instead of import
  const path = require("path");

  const fontPath = path.join(process.cwd(), "public", "fonts", "NotoSans-Regular.ttf");
  const fontBytes = fs.readFileSync(fontPath);
  const fontBase64 = fontBytes.toString("base64");
  const fontUri = `data:font/ttf;base64,${fontBase64}`;

  Font.register({
    family: "Noto Sans",
    src: fontUri,
  });
} else {
  // ✅ We're in the browser
  Font.register({
    family: "Noto Sans",
    src: "/fonts/NotoSans-Regular.ttf",
  });
}

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  // Header Section
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#1e40af',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'Noto Sans',
    marginBottom: 10,
    color: '#1e40af',
    letterSpacing: 0.5,
  },
  companyAddress: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#4b5563',
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 28,
    fontFamily: 'Noto Sans',
    marginBottom: 12,
    color: '#1e3a8a',
    letterSpacing: 1,
  },
  invoiceDetails: {
    fontSize: 9,
    lineHeight: 1.6,
    textAlign: 'right',
    color: '#6b7280',
  },
  // Bill To Section
  billToSection: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#1e40af',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Noto Sans',
    marginBottom: 10,
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  billToName: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    marginBottom: 8,
    color: '#111827',
  },
  billToAddress: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#4b5563',
  },
  // Table Styles
  table: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e40af',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
  },
  tableColHeader: {
    fontSize: 9,
    fontFamily: 'Noto Sans',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tableCol: {
    fontSize: 9,
    textAlign: 'center',
    color: '#374151',
  },
  // Column Widths
  col1: { width: '30%', textAlign: 'left', paddingLeft: 4 },
  col2: { width: '8%' },
  col3: { width: '10%' },
  col4: { width: '8%' },
  col5: { width: '8%' },
  col6: { width: '8%' },
  col7: { width: '8%' },
  col8: { width: '12%', textAlign: 'right', paddingRight: 4 },
  // Totals Section
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
  },
  totalsTable: {
    width: 220,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  totalsHeader: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
  },
  totalsLabel: {
    fontSize: 10,
    textAlign: 'left',
    color: '#374151',
  },
  totalsValue: {
    fontSize: 10,
    textAlign: 'right',
    color: '#374151',
    fontFamily: 'Noto Sans',
  },
  totalFinal: {
    color: '#1e40af',
    fontFamily: 'Noto Sans',
    fontSize: 12,
  },
  // Notes & Terms
  notesSection: {
    marginTop: 15,
    marginBottom: 15,
  },
  noteTitle: {
    fontSize: 11,
    fontFamily: 'Noto Sans',
    marginBottom: 8,
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noteText: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#4b5563',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 2,
    borderColor: '#e5e7eb',
  },
  footerSection: {
    flexDirection: 'column',
  },
  footerLabel: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footerValue: {
    fontSize: 11,
    color: '#1e40af',
    fontFamily: 'Noto Sans',
  },
});

const findTotal = useItemsStore.getState().findTotal;

// Invoice PDF Component
const InvoicePDF: React.FC<{ 
  InvoiceInfo: InvoiceInfo; 
  itemsData: ItemsData[];
  totals: {
    subtotal: number;
    tax: number;
    total: number;
  };
}> = ({ InvoiceInfo, itemsData, totals }) => {
  const currencySymbol = '₹';
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{InvoiceInfo.companyName}</Text>
            <Text style={styles.companyAddress}>{InvoiceInfo.address1}</Text>
            <Text style={styles.companyAddress}>{InvoiceInfo.address2}</Text>
            <Text style={styles.companyAddress}>{InvoiceInfo.address3}</Text>
          </View>
          
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceDetails}>Invoice No: 123432</Text>
            <Text style={styles.invoiceDetails}>Order Date: 22/06/2025</Text>
            <Text style={styles.invoiceDetails}>Delivery Date: 22/07/2025</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.billToSection}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.billToName}>{InvoiceInfo.billToName}</Text>
          <Text style={styles.billToAddress}>{InvoiceInfo.billToAddress1}</Text>
          <Text style={styles.billToAddress}>{InvoiceInfo.billToAddress2}</Text>
          <Text style={styles.billToAddress}>{InvoiceInfo.billToAddress3}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableColHeader, styles.col1]}>Item</Text>
            <Text style={[styles.tableColHeader, styles.col2]}>Qty</Text>
            <Text style={[styles.tableColHeader, styles.col3]}>Rate</Text>
            <Text style={[styles.tableColHeader, styles.col4]}>IGST%</Text>
            <Text style={[styles.tableColHeader, styles.col5]}>CGST%</Text>
            <Text style={[styles.tableColHeader, styles.col6]}>SGST%</Text>
            <Text style={[styles.tableColHeader, styles.col7]}>CESS%</Text>
            <Text style={[styles.tableColHeader, styles.col8]}>Amount</Text>
          </View>

          {/* Table Rows */}
          {itemsData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.col1]}>{item.itemsDescription}</Text>
              <Text style={[styles.tableCol, styles.col2]}>{item.qty ?? ''}</Text>
              <Text style={[styles.tableCol, styles.col3]}>{currencySymbol}{item.rate ?? 0}</Text>
              <Text style={[styles.tableCol, styles.col4]}>{item.igst ?? 0}%</Text>
              <Text style={[styles.tableCol, styles.col5]}>{item.cgst ?? 0}%</Text>
              <Text style={[styles.tableCol, styles.col6]}>{item.sgst ?? 0}%</Text>
              <Text style={[styles.tableCol, styles.col7]}>{item.cess ?? 0}%</Text>
              <Text style={[styles.tableCol, styles.col8]}>{currencySymbol}{item.amount ?? 0}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsTable}>
            <View style={[styles.totalsRow, styles.totalsHeader]}>
              <Text style={[styles.totalsLabel, { fontFamily: 'Noto Sans' }]}>Particular</Text>
              <Text style={[styles.totalsValue, { fontFamily: 'Noto Sans' }]}>Amount</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>{currencySymbol}{totals.subtotal}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax</Text>
              <Text style={styles.totalsValue}>{currencySymbol}{totals.tax}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={[styles.totalsLabel, styles.totalFinal]}>Total Amount</Text>
              <Text style={[styles.totalsValue, styles.totalFinal]}>{currencySymbol}{totals.total}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.noteTitle}>Notes</Text>
          <Text style={styles.noteText}>{InvoiceInfo.notes}</Text>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.notesSection}>
          <Text style={styles.noteTitle}>Terms and Conditions</Text>
          <Text style={styles.noteText}>{InvoiceInfo.tnc}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={styles.footerLabel}>Issued By</Text>
            <Text style={styles.footerValue}>{InvoiceInfo.companyName}</Text>
          </View>
          <View style={[styles.footerSection, { alignItems: 'flex-end' }]}>
            <Text style={styles.footerLabel}>Powered By</Text>
            <Text style={styles.footerValue}>InvoiceeAI</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Usage Component with Download Button
export const InvoiceDownloadButton: React.FC<{
  InvoiceInfo: InvoiceInfo;
  itemsData: ItemsData[];
}> = ({ InvoiceInfo, itemsData }) => {
  const totals = {
    subtotal: findTotal("rate"),
    tax: findTotal("igst") + findTotal("cgst") + findTotal("sgst") + findTotal("cess"),
    total: findTotal("amount")
  };

  return (
    <PDFDownloadLink
      document={<InvoicePDF InvoiceInfo={InvoiceInfo} itemsData={itemsData} totals={totals} />}
      fileName="invoice.pdf"
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
    >
      {({ loading }) => (loading ? 'Generating PDF...' : 'Download Invoice PDF')}
    </PDFDownloadLink>
  );
};

export const generateInvoicePdf : React.FC<{
  InvoiceInfo: InvoiceInfo;
  itemsData: ItemsData[];
}> = ({ InvoiceInfo, itemsData }) => {
  const totals = {
    subtotal: findTotal("rate"),
    tax: findTotal("igst") + findTotal("cgst") + findTotal("sgst") + findTotal("cess"),
    total: findTotal("amount")
  };
  return (
    <InvoicePDF InvoiceInfo={InvoiceInfo} itemsData={itemsData} totals={totals} />
  );
};

// Blob for sending via email or downloading
export const generateInvoiceBlob = async (
  InvoiceInfo: InvoiceInfo,
  itemsData: ItemsData[],
): Promise<Blob> => {
  const totals = {
    subtotal: findTotal("rate"),
    tax: findTotal("igst") + findTotal("cgst") + findTotal("sgst") + findTotal("cess"),
    total: findTotal("amount")
  };

  const blob = await pdf(
    <InvoicePDF InvoiceInfo={InvoiceInfo} itemsData={itemsData} totals={totals} />
  ).toBlob();
  
  return blob;
};