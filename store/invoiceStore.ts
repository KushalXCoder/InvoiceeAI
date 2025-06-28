import { getNanoId } from "@/lib/helper/nanoId";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type InvoiceData = {
    invoiceId: string,
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
    reset: () => void,
    generateInvoiceId: () => void,
};

const initialInvoiceData: InvoiceData = {
    invoiceId: '',
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
                })),
            reset: () =>
                set(() => ({
                    data: initialInvoiceData,
                })),
            generateInvoiceId: () =>
                set((state) => ({
                    data: {
                        ...state.data,
                        invoiceId: `${getNanoId()}`,
                    },
                })),
        }),
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