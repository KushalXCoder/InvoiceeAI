"use client";

import React, { useState } from "react";
// import { RxCross2 } from "react-icons/rx";
import { useItemsStore } from "@/store/itemsStore";
import { useInvoiceStore } from "@/store/invoiceStore";
import { useAiStore } from "@/store/aiStore";
// import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SendIcon, Sparkles } from "lucide-react";

const UserForm = () => {
  const [userInput, setUserInput] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    // Mark the chat state true
    if (!useAiStore.getState().chat) {
      useAiStore.setState({ chat: true });
      // router.push("/dashboard/ai-invoice"); Works locally but not during development
      router.refresh();
    }

    // Get the chatId
    const chatId = useAiStore.getState().chatId;

    // Store the userInput and set userInput as blank
    const input = userInput;
    setUserInput("");

    // Create a chat
    let chat = {
      sender: "user",
      content: input,
    };

    useAiStore.getState().addChats(chat);

    // Mark the isThinking state equal to true
    useAiStore.setState({ isThinking: true });

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/ai-invoice`, {
      method: "POST",
      body: JSON.stringify({ userInput: input, chatId: chatId }),
    });

    const data = await res.json();
    console.log(data);

    // Update the chatId, if it's empty
    if (chatId === "" || chatId === undefined) {
      useAiStore.setState({ chatId: data.chatId });
    }

    let parsed = data.ans;
    if (typeof parsed === "string") {
      parsed = parsed
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\*/g, "")
        .trim();
      try {
        parsed = JSON.parse(parsed);
      } catch (e) {
        // Still a string, leave it as-is
        console.error("Still a string:", e);
      }
    }

    // Update the chat object and add to the store
    chat = {
      sender: "bot",
      content: parsed,
    };

    useAiStore.getState().addChats(chat);

    // Set the isThinking state equals to false
    useAiStore.setState({ isThinking: false });

    // Map the data and store
    if (typeof parsed === "object" && parsed.invoice_details) {
      // Reset the items data
      useItemsStore.getState().resetItems();
      useInvoiceStore.getState().reset();

      // Get the updatedItems
      const updatedItems = parsed.invoice_details.items.map(
        (item: AiItemData) => ({
          itemsDescription: item.item_description ?? "",
          qty: item.quantity ?? null,
          rate: item.unit_price ?? null,
          igst: item.igst ?? 0,
          cgst: item.cgst ?? 0,
          sgst: item.sgst ?? 0,
          cess: item.cess ?? 0,
          amount: item.line_total ?? null,
        })
      );

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
  };

  return (
    <>
      <div className="relative w-1/2 font-poppins">
        {/* AI Badge */}
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg z-10">
          <Sparkles size={12} />
          <span>AI Powered</span>
        </div>

        <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl">
          <textarea
            placeholder='Describe your invoice... (e.g., "Generate me an invoice for 5 T-Shirts of rupees 299 each")'
            className="ai-input w-full p-4 pr-14 resize-none min-h-[100px] max-h-[200px] rounded-2xl outline-none font-poppins text-gray-700 placeholder:text-gray-400 bg-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height =
                Math.min(e.currentTarget.scrollHeight, 200) + "px";
            }}
          />
          <Button
            onClick={handleSubmit}
            className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <SendIcon size={18} />
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-2 ml-2 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Pro tip: Be specific about quantities, prices, and item details for
          best results
        </p>
      </div>
    </>
  );
};

export default UserForm;
