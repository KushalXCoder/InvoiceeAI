import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const UseAI = async(userInput: string) => {
    try {
        const prompt = `You are an intelligent invoice data extractor. From the following text, extract all itemized billing details and return a valid JSON object with this structure:
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
    "grand_total": number
}
}
Rules:
- Do NOT include any extra explanation or text.
- Only return the JSON object.
- If any field is missing or unclear, try to infer it or set it to null.
Here is the input text:
"${userInput}"`;
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