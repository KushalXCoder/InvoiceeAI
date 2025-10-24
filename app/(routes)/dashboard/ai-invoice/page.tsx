"use client";

import ChatArea from '@/components/ai-invoice/ChatArea';
import UserForm from '@/components/ai-invoice/UserForm';
import { useAiStore } from '@/store/aiStore';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AiInvoice = () => {
  const hasHydrated = useAiStore.getState().hasHydrated;
  const chat = useAiStore.getState().chat;

  // Notify user to save work before generating new invoice, only once
  useEffect(() => {
    if(hasHydrated) {
      toast("Please save your work before proceeding, as generating a new invoice will reset the current data.");
    }
  }, [hasHydrated]);

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
    <div className='ai-invoice-page h-screen w-full flex justify-center items-center bg-gray-200 p-5'>
        {!chat ? (
          <div className="container-box bg-white h-full w-full flex flex-col justify-center items-center rounded-lg">
            <div className="user-welcome flex flex-col items-center text-center font-poppins text-5xl max-lg:text-2xl font-semibold mb-10">
                <h1 className="flex items-center gap-2">
                  Welcome to 
                  <span className="text-blue-500 hover:text-blue-700 transition-colors font-facultyGlyphic mb-1">
                    InvoiceeZ
                  </span>
                  {/* <RiRobot3Fill size={48} className='bg-blue-500 rounded-lg p-1 ms-1 mb-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-lg:h-7 max-lg:w-7' color='white'/> */}
                </h1>
                <h1>An AI Invoice Generator, here for your help !!!</h1>
            </div>
            <UserForm/>
          </div>
        ) : (
          <ChatArea/>
        )}
    </div>
  )
}

export default AiInvoice