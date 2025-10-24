// import { useItemsStore } from '@/store/itemsStore';
// import { useInvoiceStore } from '@/store/invoiceStore';
// import { useAiStore } from '@/store/aiStore';

// export const handleChat = async () => {

//     // Mark the chat state true
//     if(!useAiStore.getState().chat) {
//         useAiStore.setState({ chat: true});
//         // router.push("/dashboard/ai-invoice"); Works locally but not during development
//         router.refresh();
//     }

//     // Get the chatId
//     const chatId = useAiStore.getState().chatId;

//     // Store the userInput and set userInput as blank
//     const input = userInput;
//     setUserInput("");

//     // Create a chat
//     let chat = {
//         sender: "user",
//         content: input,
//     }

//     useAiStore.getState().addChats(chat);

//     // Mark the isThinking state equal to true
//     useAiStore.setState({isThinking: true});

//     const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/ai-invoice`, {
//         method: "POST",
//         body: JSON.stringify({userInput: input, chatId: chatId}),
//     });

//     const data = await res.json();
//     console.log(data);

//     // Update the chatId, if it's empty
//     if(chatId === "" || chatId === undefined) {
//         useAiStore.setState({ chatId: data.chatId });
//     }

//     let parsed = data.ans;
//     if (typeof parsed === "string") {
//         parsed = parsed
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .replace(/\*/g, "")
//             .trim();
//         try {
//             parsed = JSON.parse(parsed);
//         } catch (e) {
//             // Still a string, leave it as-is
//             console.error("Still a string:", e);
//         }
//     }

//     // Update the chat object and add to the store
//     chat = {
//         sender: "bot",
//         content: parsed,
//     }

//     useAiStore.getState().addChats(chat);

//     // Set the isThinking state equals to false
//     useAiStore.setState({isThinking: false});

//     // Map the data and store
//     if(typeof parsed === "object" && parsed.invoice_details) {
//         // Reset the items data
//         useItemsStore.getState().resetItems();
//         useInvoiceStore.getState().reset();

//         // Get the updatedItems
//         const updatedItems = parsed.invoice_details.items.map((item: AiItemData) => ({
//         itemsDescription: item.item_description ?? "",
//         qty: item.quantity ?? null,
//         rate: item.unit_price ?? null,
//         igst: item.igst ?? 0,
//         cgst: item.cgst ?? 0,
//         sgst: item.sgst ?? 0,
//         cess: item.cess ?? 0,
//         amount: item.line_total ?? null,
//     }));

//     console.log(updatedItems);

//     // Use the set state, to set the updatedItems to the itemsData
//     useItemsStore.setState({
//         itemsData: updatedItems,
//         isItemsChanged: true,
//     });

//     useInvoiceStore.setState({
//         data: { ...parsed.invoice_details.invoiceDetails },
//     });

//     console.log(useInvoiceStore.getState().data);
//     }
//   }