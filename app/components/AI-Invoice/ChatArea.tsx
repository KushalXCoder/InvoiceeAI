"use client";

import React, { useEffect, useRef } from 'react';
import UserForm from './UserForm';
import { useAiStore } from '@/store/aiStore';
import Link from 'next/link';

const ChatArea = () => {
  const chats = useAiStore((state) => state.chats);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(bottomRef.current) {
        bottomRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [chats]);

  const isThinking = useAiStore((state) => state.isThinking);

  return (
    <div className="h-screen w-full flex flex-col items-center font-poppins p-10">
        <div className="chat-area h-[90%] w-full overflow-x-hidden overflow-y-auto flex flex-col gap-5">
            {chats.length === 0 ? (
                <h1>This is a chat</h1>
            ) : (
                chats.map((item,index) => (
                    <div key={index} className={`flex w-full h-fit ${item.sender === "user" ? `justify-start` : `justify-end`}`}>
                        <div className={`chat-content h-fit w-fit ${item.sender === "user" ? `max-w-2/5` : `max-w-2/4`} border rounded-lg text-white bg-gray-800 px-5 py-4`}>
                            {typeof item.content === "object" ? (
                            <pre className="text-sm whitespace-pre-wrap break-words font-facultyGlyphic text-[18px]">
                                {JSON.stringify(item.content, null, 2)}
                                <p className='mt-2'><Link href="/dashboard/invoice" className='text-blue-500 hover:underline'>Click Here</Link> to view or edit the invoice or visit invoice tab</p>
                            </pre>
                            ) : (
                                <p>{item.content}</p>
                            )}
                        </div>
                    </div>    
                ))
            )}
            {isThinking && (
                <div className="flex w-full justify-end">
                    <div className="loading-content h-fit w-fit text-white font-poppins px-5 py-4 bg-gray-800 rounded-lg">
                        Loading
                    </div>
                </div>
            )}
            <div ref={bottomRef}></div>
        </div>
        <div className='h-[10%] w-full flex justify-center items-center'>
            <UserForm/>
        </div>
    </div>
  )
}

export default ChatArea