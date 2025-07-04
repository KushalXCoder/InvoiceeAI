import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useInvoiceStore } from "./invoiceStore";

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

type ItemsStore = {
    itemsData: ItemsData[],
    editingItemsData: ItemsData[],
    setEditingItemsData: (data: ItemsData[]) => void,
    setField: (index: number, field: keyof ItemsData, value: string | number | null) => void,
    addItem: () => void,
    removeItem: (index: number) => void,
    findTotal: (field: keyof Omit<ItemsData,"itemsDescription">) => number,
    shipping: number | null,
    discount: number | null,
    isItemsChanged: boolean,
    resetItems: () => void;
}

const initialItemsData: ItemsData = {
    itemsDescription: "",
    qty: null,
    rate: null,
    igst: null,
    cgst: null,
    sgst: null,
    cess: null,
    amount: null,
}

export const useItemsStore = create<ItemsStore>() (
    persist ((set,get) => ({
        itemsData: [initialItemsData],
        shipping: 0,
        discount: 0,
        setField: (index,field,value) =>
            set((state) => {
                const isEditing = useInvoiceStore.getState().isEditing;
                const items = isEditing ? [...state.editingItemsData] : [...state.itemsData];
                const updatedItem = {
                    ...items[index],
                    [field]: value,
                };
                const { qty, rate, igst, cgst, sgst, cess } = updatedItem;
                if(qty !== null && rate != null) {
                    const tax = (igst ?? 0) + (cgst ?? 0) + (sgst ?? 0) + (cess ?? 0);
                    console.log((rate) * tax/100);
                    updatedItem.amount = (qty * rate) + ((qty * rate * tax)/100);
                }
                items[index] = updatedItem;

                return isEditing
                    ? { editingItemsData: items, isItemsChanged: true }
                    : { itemsData: items, isItemsChanged: true };
            }),
        addItem: () => 
            set((state) => {
                if(useInvoiceStore.getState().isEditing) {
                    return {
                        editingItemsData: [...state.editingItemsData, { ...initialItemsData }],
                        isItemsChanged: true,
                    }
                }
                else {
                    return {
                        itemsData: [...state.itemsData, { ...initialItemsData }],
                        isItemsChanged: true,
                    }
                }
            }),
        removeItem: (index) =>
            set((state) => {
                if(useInvoiceStore.getState().isEditing) {
                    const newArray = state.editingItemsData.filter((_,i) => i != index);
                    return { editingItemsData: newArray, isItemsChanged: true };
                }
                else {
                    const newArray = state.itemsData.filter((_,i) => i != index);
                    return { itemsData: newArray, isItemsChanged: true };
                }
            }),
        findTotal: (field) => {
            const isEditing = useInvoiceStore.getState().isEditing;
            const items = isEditing ? get().editingItemsData : get().itemsData;
            return items.reduce((sum: number, item: ItemsData) => {
                const taxTypes = ["igst", "cgst", "sgst", "cess"];
                let val;
                if(taxTypes.includes(field)) {
                    val = ((item[field] ?? 0) * (item.rate ?? 0) * (item.qty ?? 0))/100;
                }
                else if(field === "rate") {
                    val = (item[field] ?? 0) * (item.qty ?? 0);
                }
                else {
                    val = (item[field] ?? 0);
                }
                return sum + val;
            },0)
        },
        isItemsChanged: false,
        resetItems: () =>
            set(() => ({
                itemsData: [initialItemsData],
                shipping: 0,
                discount: 0,
                isItemsChanged: false,
            })),
        editingItemsData: [initialItemsData],
        setEditingItemsData: (data) => 
            set(() => ({
                editingItemsData: data,
            })),
    }),
    {
        name: "items-data",
        storage: createJSONStorage(() => localStorage),
    }
));