"use client";

import React, { useState } from 'react';
import { BiSolidSend } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useItemsStore } from '@/store/itemsStore';
import { useInvoiceStore } from '@/store/invoiceStore';
import { useAiStore } from '@/store/aiStore';

type AiItemData = {
    item_description: string | "",
    quantity: number | null,
    unit_price: number | null,
    igst: number | null,
    cgst: number | null,
    sgst: number | null,
    cess: number | null,
    line_total: number | null,
}

const UserForm = () => {
   const [userInput, setUserInput] = useState<string>("");
   const [notice, setNotice] = useState<boolean>(true);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the chatId
    const chatId = useAiStore.getState().chatId;

    // Store the userInput and set userInput as blank
    const input = userInput;
    setUserInput("");

    // Create a chat
    let chat = {
        sender: "user",
        content: input,
    }

    useAiStore.getState().addChats(chat);

    // Mark the chat state true
    useAiStore.setState({ chat: true});

    // Mark the isThinking state equal to true
    useAiStore.setState({isThinking: true});

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/ai-invoice`, {
        method: "POST",
        body: JSON.stringify({userInput: input, chatId: chatId}),
    });

    const data = await res.json();
    console.log(data);

    // Update the chatId, if it's empty
    if(chatId === "" || chatId === undefined) {
        useAiStore.setState({chatId: data.chatId});
    }

    let parsed = data.ans;
    if(typeof parsed === "string") {
        parsed = parsed
        .replace(/```json/g, "") // remove ```json
        .replace(/```/g, "")     // remove ```
        .trim();
        console.log(parsed);

        parsed = JSON.parse(parsed);
    }

    // Update the chat object and add to the store
    chat = {
        sender: "bot",
        content: parsed,
    }

    useAiStore.getState().addChats(chat);

    // Set the isThinking state equals to false
    useAiStore.setState({isThinking: false});

    // Reset the items data
    useItemsStore.getState().resetItems();
    useInvoiceStore.getState().reset();

    console.log(parsed);

    // Map the data and store
    const updatedItems = parsed.invoice_details.items.map((item: AiItemData) => ({
        itemsDescription: item.item_description ?? "",
        qty: item.quantity ?? null,
        rate: item.unit_price ?? null,
        igst: item.igst ?? 0,
        cgst: item.cgst ?? 0,
        sgst: item.sgst ?? 0,
        cess: item.cess ?? 0,
        amount: item.line_total ?? null,
    }));

    console.log(updatedItems);

    // Use the set state, to set the updatedItems to the itemsData
    useItemsStore.setState({
        itemsData: updatedItems,
        isItemsChanged: true,
    });

    useInvoiceStore.setState({
        data: { ...parsed.invoice_details.invoiceDetails },
    });

    console.log(useInvoiceStore.getState().data);
  }

  return (
    <>
    <form onSubmit={handleSubmit} className={`user-input mt-15 w-3/5 border rounded-lg flex items-center px-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className='outline-0 py-3 font-poppins w-full' placeholder='Generate me an invoice for 5 T-Shirts of rupees 299 each' required/>
        <button type='submit'>
            <BiSolidSend size={25} className='hover:text-blue-700 transition-colors'/>
        </button>
    </form>
    {notice && (
        <div className="notice absolute top-5 right-5 h-fit w-[380px] px-4 py-3 border-2 border-red-500 rounded-lg bg-white flex flex-col gap-2 shadow-xl">
            <div className="top flex justify-between items-center gap-3 font-facultyGlyphic">
                <h1 className='text-blue-500 text-xl font-bold'>InvoiceeZ</h1>
                <RxCross2 size={22} onClick={() => setNotice(false)}/>
            </div>
            <p className='font-poppins'>Please make sure, you have saved your invoice, you are working on, as using me, would overwrite it.</p>
        </div>
    )}
    </>
  )
}

export default UserForm