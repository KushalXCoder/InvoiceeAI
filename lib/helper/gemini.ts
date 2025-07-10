import { GoogleGenAI } from "@google/genai";
import dayjs from "dayjs";

interface Chats {
  sender: string,
  content: string,
}

// interface ChatHistory {
//   _id: string,
//   chats: Chats[],
//   __v: number,
// }

// interface ChatProps {
//   userInput: string,
//   chatHistory: ChatHistory[], 
// }

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const UseAI = async(userInput: string, chatHistory: Chats[]) => {
    try {
        const prompt = `
You are an intelligent invoice data extractor.

From the following text, extract all itemized billing details and return a valid JSON object with this structure:

{
  "invoice_details": {
    "items": [
      {
        "item_description": string,
        "quantity": number,
        "unit_price": number,
        "line_total": number
      }
    ],
    "invoiceDetails": {
      "invoiceNumber": string,
      "companyName": string,
      "orderDate": string,
      "dueDate": string,
      "billToName": string,
      "billToAddress1": string,
      "billToAddress2": string,
      "billToAddress3": string,
      "notes": string,
      "tnc": string
    },
    "grand_total": number
  }
}

Instructions:
- If the user asks "who are you" or "what can you do", respond by saying you are InvoiceeZ — an AI assistant specialized in creating and extracting invoice data.
- Also, take in consider the chat history provided to you to give the answer
- If, no details are provided, then you should return to user saying please give some details or soemthing else like that
- If the user input is **not related to invoices**, respond normally and help as a general assistant.
- If the input is related to invoices, follow the format strictly and return only the raw JSON object — no explanations, no markdown formatting.
- If order date is mentioned, use that.
- If not mentioned, use today's date as orderDate: "${dayjs().format()}".
- Set dueDate to one month from today (or based on mentioned orderDate): "${dayjs().add(1, 'month').format()}".
- Do not make assumptions unless clearly stated.
- If any field is unclear or missing, set it to 'null'.
- Divide the tax amount (if any) equally into igst, cgst, sgst, and cess — the sum must equal the given total tax.
- If no tax is given, set all tax fields to 0.
- If terms and conditions or notes are not provided, generate relevant ones based on the company name and the listed items.
- Ensure the returned JSON is valid and parseable.

Here is the input text:
"${userInput}"

Here is the chat history:
"${chatHistory.map(m => `${m.sender === "user" ? "User" : "Bot"}: ${m.content}`).join('\n')}"
`;
        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return res.text;
        console.log(res.text);
    } catch (error) {
        console.log("Error getting response from gemini", error);
    }
};

export default UseAI