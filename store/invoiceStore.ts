import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import dayjs from 'dayjs';

type InvoiceStore = {
    data: InvoiceInfo,
    currentInvoiceId: string,
    setInvoiceId: (id: string) => void,
    setField: (field: keyof InvoiceInfo, value: string | File | null) => void,
    isInvoiceChanged: boolean,
    isEditing: boolean,
    setEdit: (value: boolean) => void,
    editingData: InvoiceInfo,
    setEditingData: (data: InvoiceInfo) => void,
    reset: () => void,
};

const initialInvoiceInfo: InvoiceInfo = {
    invoiceId: '',
    invoiceNumber: '',
    orderDate: dayjs().format("DD-MM-YYYY"),
    dueDate: null,
    companyName: '',
    // logo: null,
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
            data: initialInvoiceInfo,
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
            editingData: initialInvoiceInfo,
            setEditingData: (data) =>
                set(() => ({
                    editingData: data,
                })),
            reset: () =>
                set(() => ({
                    data: initialInvoiceInfo,
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