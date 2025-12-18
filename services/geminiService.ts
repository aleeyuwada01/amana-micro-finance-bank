
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialAdvice(userContext: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a specialized financial advisor for micro-entrepreneurs and farmers in Katsina, Nigeria. 
      Based on this transaction history and profile: "${userContext}", provide:
      1. A "Trust Score" (300-850).
      2. A tailored "Wealth Tip" focusing on savings strategies (like Asusu optimization) or low-risk local investment options (e.g., commodity trading, livestock scaling) suitable for Katsina MSMEs.
      3. A "Market Outlook" specific to current economic trends in Katsina.
      Return in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            wealthTip: { type: Type.STRING },
            marketOutlook: { type: Type.STRING },
            rating: { type: Type.STRING, description: "One word: Elite, Strong, Growing, or Basic" }
          },
          required: ["score", "wealthTip", "marketOutlook", "rating"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Advisory Error:", error);
    return { 
      score: 620, 
      rating: "Growing", 
      wealthTip: "Consistent grain trading at the Central Market is your strength. Consider reinvesting 15% of your weekly profit into bulk storage to leverage seasonal price hikes.",
      marketOutlook: "The upcoming harvest season in Katsina suggests a favorable period for investing in transport logistics."
    };
  }
}

export async function translateText(text: string, targetLang: 'Hausa' | 'English') {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Translate the following text to ${targetLang}: "${text}". Return only the translated string.`,
        });
        return response.text;
    } catch (e) {
        return text;
    }
}
