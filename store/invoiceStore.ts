import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import dayjs from 'dayjs';

type InvoiceData = {
    invoiceId: string,
    invoiceNumber: string,
    orderDate: string,
    dueDate: string | null,
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

type InvoiceStore = {
    data: InvoiceData,
    setField: (field: keyof InvoiceData, value: string | File | null) => void,
    isInvoiceChanged: boolean,
    reset: () => void,
};

const initialInvoiceData: InvoiceData = {
    invoiceId: '',
    invoiceNumber: '',
    orderDate: dayjs().format("DD-MM-YYYY"),
    dueDate: null,
    companyName: '',
    logo: null,
    address1: '',
    address2: '',
    address3: '',
    billToName: '',
    billToAddress1: '',
    billToAddress2: '',
    billToAddress3: '',
    notes: '',
    tnc: '',
};

export const useInvoiceStore = create<InvoiceStore>()(
    persist(
        (set) => ({
            data: initialInvoiceData,
            setField: (field, value) =>
                set((state) => ({
                    data: { ...state.data, [field]: value },
                    isInvoiceChanged: true,
                })),
            isInvoiceChanged: false,
            reset: () =>
                set(() => ({
                    data: initialInvoiceData,
                    isInvoiceChanged: false,
                })),
            }
        ),
        {
            name: "invoice-storage",
            partialize: (state) => ({
                data: {
                    ...state.data,
                    logo: null,
                },
            }),
            storage: createJSONStorage(() => localStorage),
        }
    )
);