import { GoogleGenAI } from "@google/genai";
import dayjs from "dayjs";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const UseAI = async(userInput: string) => {
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
- If order date is mentioned take that or if mentioned today's date then use ${dayjs().format()} and calculate 15 days from today or anything give in the input according taking ${dayjs().format()} as the reference or the mentioned date by user
- Do not make assumptions or use todays date unless explicitly written in the text.
- Only return the raw JSON object — no explanations, no markdown formatting.
- If any field is unclear or missing, set it to 'null'.
- Ensure the JSON is valid and complete.
- Divide the tax given by the user in such a way that all fields of tax (igst, cgst, sgst and cess) gets equal amount and it's sum is eaual to the input's tax
- If not given then, auto generate the terms and conditions and notes for the user based on compny name and items

Here is the input text:
"${userInput}"
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