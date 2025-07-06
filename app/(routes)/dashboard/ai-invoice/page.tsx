"use client";

import ChatArea from '@/app/components/AI-Invoice/ChatArea';
import UserForm from '@/app/components/AI-Invoice/UserForm';
import { useAiStore } from '@/store/aiStore';
import React from 'react';
import { RiRobot3Fill } from "react-icons/ri";

const AiInvoice = () => {
  const hasHydrated = useAiStore.getState().hasHydrated;
  const chat = useAiStore.getState().chat;
  console.log(chat);
  console.log(useAiStore.getState().chatId);

  if(!hasHydrated){
    return (
      <div className="h-screen w-full flex flex-col gap-10 p-10 items-center">
        <div className="chats w-full">
          <div className="flex justify-start">
            <div className="bg-gray-400 h-20 w-2/5 px-4 py-2 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-400 h-20 w-2/5 px-4 py-2 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="input absolute bottom-8 w-2/4 h-12 bg-gray-400 rounded-lg"></div>
      </div>
    )
  }

  return (
    <div className='ai-invoice-page h-screen w-full flex justify-center items-center'>
        {!chat ? (
          <div className="container-box flex flex-col items-center">
            <div className="user-welcome flex flex-col items-center font-poppins text-5xl font-bold">
                <h1 className="flex items-center gap-2">
                  Welcome to 
                  <span className="text-blue-500 hover:text-blue-700 transition-colors font-facultyGlyphic ml-1">
                    InvoiceeZ
                  </span>
                  <RiRobot3Fill size={48} className='bg-blue-500 rounded-lg p-1 ms-1 mb-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' color='white'/>
                </h1>
                <h1>An AI Invoice Generator, here for your help !!!</h1>
            </div>
            <UserForm/>
            <div className="user-info-box font-poppins p-3 border-2 rounded-lg border-red-500 w-4/6 mt-10 text-center absolute bottom-8">
              <p>InvoiceeZ is an AI to make your life easy, by making invoice generation easier instead of just entering data manually. We try to make the AI as better as possible, to make the results more good. If, you are not satisfied with results, I am so sorry for it.</p>
            </div>
          </div>
        ) : (
          <ChatArea/>
        )}
    </div>
  )
}

export default AiInvoice