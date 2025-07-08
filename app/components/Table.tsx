import { useItemsStore } from '@/store/itemsStore';
import { useInvoiceStore } from '@/store/invoiceStore';
import React from 'react';
import { RxCross2 } from "react-icons/rx";

type ItemsData = {
  itemsDescription: string,
  qty: number | null,
  rate: number | null,
  igst: number | null,
  cgst: number | null,
  sgst: number | null,
  cess: number | null,
  amount: number | null,
};

const Table = () => {
  const { itemsData, editingItemsData, setField, addItem, removeItem } = useItemsStore();

  const tableConfig = [
    { key: "itemsDescription", label: "Item Description", width: "w-[280px]" },
    { key: "qty", label: "Qty", width: "w-[50px]" },
    { key: "rate", label: "Rate", width: "w-[80px]" },
    { key: "igst", label: "IGST%", width: "w-[60px]" },
    { key: "cgst", label: "CGST%", width: "w-[60px]" },
    { key: "sgst", label: "SGST%", width: "w-[60px]" },
    { key: "cess", label: "CESS%", width: "w-[60px]" },
    { key: "amount", label: "Amount", width: "w-[100px]" },
  ];
  
  const handleAdd = () => {
    addItem();
  };
  
  const handleRemove = (rowIndex : number) => {
    removeItem(rowIndex);
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
    const { name, value, type } = e.target;
    const key = name as keyof ItemsData;
    const parsedValue = type === "number"
    ? (value === "" ? null : Number(value))
    : value;
    setField(rowIndex, key, parsedValue);
  }

  const isEditing = useInvoiceStore.getState().isEditing;
  const source = isEditing ? editingItemsData : itemsData;

  console.log(useItemsStore.getState().itemsData);

  return (
    <>
    <table className="table-fixed w-full border-collapse font-poppins text-[14px]">
        <thead>
            <tr className="bg-[#1e3a8a] text-[#ffffff]">
            {tableConfig.map((col, i) => (
                <th key={i} className={`py-2 px-2 text-left ${col.width} capitalize max-lg:text-[12px]`}>{col.label}</th>
            ))}
            <th className='w-[25px]'></th>
            </tr>
        </thead>
        <tbody>
            {source.map((item, rowIndex) => (
            <>
            <tr key={rowIndex} className='w-full'>
                {tableConfig.map((col, colIndex) => (
                <td key={colIndex} className={`pe-1 py-1 ${col.width}`}>
                    <input
                    type={col.key === 'itemsDescription' ? `text` : `number`}
                    value={item[col.key as keyof ItemsData] ?? ""}
                    onChange={(e) => handleChange(e, rowIndex)}
                    name={col.key}
                    className="w-full border border-[#d1d5db] rounded-md text-sm outline-none px-2 py-1 capitalize"
                    />
                </td>
                ))}
                <td className="w-[40px]">
                {rowIndex !== 0 && (
                    <button
                      className="w-full h-full flex items-center justify-center text-[#6b7280] transition-colors"
                      onClick={() => handleRemove(rowIndex)}
                    >
                      <RxCross2 size={18} />
                    </button>
                )}
                </td>
            </tr>
            </>
            ))}
        </tbody>
    </table>
    <div className="button mt-4">
        <button className="px-4 py-2 rounded-lg bg-[#3b82f6] text-[#ffffff] font-poppins hover:cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-lg:text-sm" onClick={handleAdd}>
            Add Item
        </button>
    </div>
    </>
  )
}

export default Table