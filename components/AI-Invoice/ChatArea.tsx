"use client";

import React, { useEffect, useRef, useState } from "react";
// import UserForm from "./UserForm";
import { useAiStore } from "@/store/aiStore";
import Link from "next/link";
import { RiChatNewFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { SendIcon } from "lucide-react";
import { useItemsStore } from "@/store/itemsStore";
import { useInvoiceStore } from "@/store/invoiceStore";

const ChatArea = () => {
  const chats = useAiStore((state) => state.chats);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [userInput, setUserInput] = useState<string>("");

  const handleSubmit = async () => {
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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const isThinking = useAiStore((state) => state.isThinking);

  const handleNewChat = () => {
    useAiStore.setState({ chat: false, chatId: "" });
    router.push("/dashboard/ai-invoice");
    useAiStore.getState().setChats([]);
  };

  return (
    <div className="h-screen w-full p-3 bg-gray-200">
      <div className="h-full w-full flex flex-col bg-white rounded-2xl font-poppins shadow-2xl border border-gray-200">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {chats.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-700">
                Start Your Conversation
              </h1>
              <p className="text-center text-gray-400 max-w-md">
                Begin by describing the invoice you&apos;d like to generate. Our
                AI will help you create it instantly.
              </p>
            </div>
          ) : (
            chats.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.sender === "user" ? "justify-start" : "justify-end"
                } animate-in slide-in-from-bottom duration-300`}
              >
                <div
                  className={`
                            px-5 py-3.5 max-lg:px-4 max-lg:py-3 rounded-2xl shadow-lg text-sm break-words
                            ${
                              item.sender === "user"
                                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-bl-none max-w-[50%] shadow-blue-200"
                                : "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-br-none max-w-[90%] shadow-gray-300"
                            }
                        `}
                >
                  {typeof item.content === "object" ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-green-400">
                          Invoice Generated Successfully
                        </span>
                      </div>
                      <pre className="overflow-x-auto whitespace-pre-wrap text-xs font-mono bg-black/40 p-3 rounded-lg border border-gray-700 backdrop-blur-sm">
                        {JSON.stringify(item.content, null, 2)}
                      </pre>
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <Link
                          href="/dashboard/invoice"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
                        >
                          <span>View & Edit Invoice</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p className="leading-relaxed">{item.content}</p>
                  )}
                </div>
              </div>
            ))
          )}

          {isThinking && (
            <div className="flex justify-end animate-in slide-in-from-bottom duration-300">
              <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 text-sm shadow-lg flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-gray-200">
                  Generating your invoice...
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
        <div className="border-t border-gray-200 px-6 py-4 bg-white rounded-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="pl-4 pr-3 flex items-center gap-2 border-r border-gray-200">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>AI</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder='Describe your invoice... e.g., "5 T-Shirts @ ₹299 each"'
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (userInput.trim()) {
                          handleSubmit();
                        }
                      }
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!userInput.trim()}
                    className="mr-2 p-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <SendIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                className="group relative p-3 border-2 border-gray-200 hover:border-blue-500 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 bg-white"
                onClick={handleNewChat}
              >
                <RiChatNewFill
                  size={20}
                  className="text-gray-600 group-hover:text-blue-500 transition-colors"
                />
                <span className="absolute -top-9 right-0 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  New Chat
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
