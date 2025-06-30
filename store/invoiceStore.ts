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
    currentInvoiceId: string,
    setInvoiceId: (id: string) => void,
    setField: (field: keyof InvoiceData, value: string | File | null) => void,
    isInvoiceChanged: boolean,
    isEditing: boolean,
    setEdit: (value: boolean) => void,
    editingData: InvoiceData,
    setEditingData: (data: InvoiceData) => void,
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
            currentInvoiceId: '',
            setInvoiceId: (id: string) => 
                set(() => ({
                    currentInvoiceId: id,
                })),
            isEditing: false,
            setField: (field, value) =>
                set((state) => {
                    if(state.isEditing === false) {
                        return {
                            data: { ...state.data, [field]: value },
                            isInvoiceChanged: true,
                        }
                    }
                    else {
                        return {
                            editingData: { ...state.editingData, [field]: value },
                            isInvoiceChanged: true,
                        }
                    }
                }),
            isInvoiceChanged: false,
            setEdit: (value) =>
                set(() => ({
                    isEditing: value,
                })),
            editingData: initialInvoiceData,
            setEditingData: (data) =>
                set(() => ({
                    editingData: data,
                })),
            reset: () =>
                set(() => ({
                    data: initialInvoiceData,
                    isInvoiceChanged: false,
                    currentInvoiceId: '',
                })),
            }
        ),
        {
            name: "invoice-storage",
            partialize: (state) => ({
                data: { ...state.data, logo: null },
                currentInvoiceId: state.currentInvoiceId,
                isEditing: state.isEditing,
                editingData: { ...state.editingData }
            }),
            storage: createJSONStorage(() => localStorage),
        }
    )
);