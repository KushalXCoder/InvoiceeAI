import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
    setField: (index: number, field: keyof ItemsData, value: string | number | null) => void,
    addItem: () => void,
    removeItem: (index: number) => void,
    findTotal: (field: keyof Omit<ItemsData,"itemsDescription">) => number,
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
        setField: (index,field,value) =>
            set((state) => {
                const updatedItems = [...state.itemsData];
                const updatedItem = {
                    ...updatedItems[index],
                    [field]: value,
                };
                const { qty, rate, igst, cgst, sgst, cess } = updatedItem;
                if(qty !== null && rate != null) {
                    const tax = (igst ?? 0) + (cgst ?? 0) + (sgst ?? 0) + (cess ?? 0);
                    console.log((rate) * tax/100);
                    updatedItem.amount = (qty * rate) + ((qty * rate * tax)/100);
                }
                updatedItems[index] = updatedItem;
                return { itemsData: updatedItems, isItemsChanged: true }
            }),
        addItem: () => 
            set((state) => ({
                itemsData: [...state.itemsData, { ...initialItemsData }],
                isItemsChanged: true,
            })),
        removeItem: (index) =>
            set((state) => {
                const newArray = state.itemsData.filter((_,i) => i != index);
                return { itemsData: newArray, isItemsChanged: true };
            }),
        findTotal: (field) => {
            return get().itemsData.reduce((sum: number, item: ItemsData) => {
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
                isItemsChanged: false,
            }))
    }),
    {
        name: "items-data",
        storage: createJSONStorage(() => localStorage),
    }
));