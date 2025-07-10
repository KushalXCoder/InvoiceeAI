import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ChatData = {
    // _id: string,
    // chatId?: string,
    sender: string,
    content: string,
}

type AiStore = {
    chat: boolean,
    chats: ChatData[],
    setChats: (chats: ChatData[]) => void,
    addChats: (chat: ChatData) => void,
    resetChats: () => void,
    chatId: string,
    hasHydrated: boolean,
    setHasHydrated: (val: boolean) => void,
    isThinking: boolean,
}

export const useAiStore = create<AiStore>() (
    persist (
        (set) => ({
                chat: false,
                chats: [],
                setChats: (chats) => set({ chats: chats }),
                addChats: (chat) =>
                    set((state) => ({
                        chats: [...state.chats, chat],
                    })),
                resetChats: () => set({ chats: [] }),
                chatId: "",
                hasHydrated: false,
                setHasHydrated: (val) =>
                    set(() => ({
                        hasHydrated: val,
                    })),
                isThinking: false,
            }
        ),
        {
            name: "ai-storage",
            storage: createJSONStorage(() => sessionStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
)