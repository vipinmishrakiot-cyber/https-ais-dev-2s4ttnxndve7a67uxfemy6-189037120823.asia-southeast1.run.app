
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const verifyLabel = async (base64Image: string): Promise<ScanResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image
            }
          },
          {
            text: `Analyze this image to verify if it is a genuine label for "TRILOKNEER" water. 
            Look for these specific characteristics from the official label:
            1. Brand Name: "TRILOKNEER" in large white capital letters.
            2. Color: Vibrant red background.
            3. Logo: A blue water drop with a circled 'R' inside it on the left.
            4. Slogan: "shuddh pani, swasth jeevan" in cursive white text.
            5. Certification: FSSAI logo and number.
            6. Manufacturer: Badaunwa, Sheetalganj, Mariahu, Jaunpur.
            
            Return the analysis as JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isGenuine: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER, description: "Confidence score from 0 to 1" },
            feedback: { type: Type.STRING },
            details: {
              type: Type.OBJECT,
              properties: {
                brandNameFound: { type: Type.BOOLEAN },
                logoDetected: { type: Type.BOOLEAN },
                fssaiVerified: { type: Type.BOOLEAN }
              },
              required: ["brandNameFound", "logoDetected", "fssaiVerified"]
            }
          },
          required: ["isGenuine", "confidence", "feedback", "details"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result as ScanResult;
  } catch (error) {
    console.error("Gemini Verification Error:", error);
    return {
      isGenuine: false,
      confidence: 0,
      feedback: "Verification service currently unavailable. Please check your connection."
    };
  }
};
