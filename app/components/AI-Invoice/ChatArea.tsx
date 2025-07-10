"use client";

import React, { useEffect, useRef } from 'react';
import UserForm from './UserForm';
import { useAiStore } from '@/store/aiStore';
import Link from 'next/link';
import { RiChatNewFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';

const ChatArea = () => {
  const chats = useAiStore((state) => state.chats);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(bottomRef.current) {
        bottomRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [chats]);

  const isThinking = useAiStore((state) => state.isThinking);

  const handleNewChat = () => {
    useAiStore.setState({ chat: false, chatId: ""});
    router.push("/dashboard/ai-invoice");
    useAiStore.getState().setChats([]);
  }

  return (
    <div className="h-screen w-full flex flex-col font-poppins bg-zinc-900 text-white">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {chats.length === 0 ? (
                <h1 className="text-center text-gray-400">Start a conversation to generate an invoice</h1>
                ) : (
                chats.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${item.sender === "user" ? "justify-start" : "justify-end"}`}
                    >
                        <div
                            className={`
                            px-5 py-3 rounded-xl shadow-md text-sm break-words
                            ${item.sender === "user" ? "bg-blue-600 text-white rounded-bl-none max-w-[50%]" : "bg-zinc-800 text-gray-100 rounded-br-none max-w-[80%]"}
                            `}
                        >
                            {typeof item.content === "object" ? (
                            <>
                                <pre className="overflow-x-auto whitespace-pre-wrap text-xs font-mono bg-zinc-900 p-2 rounded-lg border border-zinc-700">
                                    {JSON.stringify(item.content, null, 2)}
                                </pre>
                                <p className="mt-2 text-blue-400 text-sm">
                                    <Link href="/dashboard/invoice" className="hover:underline">
                                        Click here
                                    </Link>{" "}
                                    to view or edit the invoice
                                </p>
                            </>
                            ) : (
                            <p>{item.content}</p>
                            )}
                        </div>
                    </div>
                ))
            )}

            {isThinking && (
            <div className="flex justify-end">
                <div className="px-5 py-3 rounded-xl bg-zinc-700 text-sm animate-pulse">
                Generating...
                </div>
            </div>
            )}

            <div ref={bottomRef} />
        </div>
        <div className="border-t border-zinc-700 px-6 py-6 bg-zinc-800 text-black flex justify-center">
            <UserForm />
        </div>
        <button className="new-chat absolute bottom-6 right-10 border border-gray-400 p-2 rounded-lg cursor-pointer hover:border-blue-300 group" onClick={handleNewChat}>
            <RiChatNewFill size={30} className='group-hover:text-blue-300'/>
        </button>
    </div>
  )
}

export default ChatArea