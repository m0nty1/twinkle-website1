import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const AIService = {
  /**
   * Generates the system instruction string with the current product catalog.
   */
  getSystemInstruction: (products: Product[]) => {
    const productContext = products.map(p => 
      `- ID: ${p.id} | Name: ${p.title} | Cat: ${p.category} | Desc: ${p.description} | Attributes: ${JSON.stringify(p.attributes || {})}`
    ).join('\n');

    return `
      You are Twinkle AI, the official luxury advisor for Twinkle Egypt.
      
      PRODUCT INVENTORY:
      ${productContext}

      YOUR JOB:
      - Recommend products based on user queries.
      - If recommending, use the tag {{REC:id1,id2}} at the end.
      - Be warm, elegant, and helpful.
    `;
  },

  /**
   * Creates a new chat session.
   */
  createChat: (products: Product[]) => {
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AIService.getSystemInstruction(products),
      },
    });
  },

  /**
   * Parses the response to separate the text message from the recommendation IDs.
   */
  parseResponse: (text: string) => {
    const recRegex = /{{REC:([\w,]+)}}/;
    const match = text.match(recRegex);
    
    let cleanText = text;
    let recommendations: string[] = [];

    if (match) {
      cleanText = text.replace(match[0], '').trim();
      recommendations = match[1].split(',');
    }

    return { text: cleanText, recommendations };
  },

  /**
   * VISION: Analyzes an image and finds the best matching product ID from the catalog.
   */
  matchImageToProduct: async (imageBase64: string, products: Product[]): Promise<{ productId: string, confidence: number, reasoning: string }> => {
    // Create a simplified catalog for the AI to process efficiently
    const catalogSummary = products.map(p => 
      `ID: ${p.id}, Title: ${p.title}, Type: ${p.category}, Color/Material: ${p.attributes?.color || 'N/A'}, Notes: ${p.attributes?.notes || p.description}`
    ).join('\n');

    const prompt = `
      Look at this product image carefully.
      I have a list of products. Your goal is to identify which product this image belongs to.
      
      CATALOG:
      ${catalogSummary}

      RULES:
      1. Analyze the image visually (Color, Shape, Material, Context).
      2. Match it to the single most likely product from the CATALOG.
      3. Return ONLY a JSON object. Do not add markdown blocks.
      
      JSON SCHEMA:
      {
        "productId": "string (the ID of the match)",
        "confidence": number (0 to 1),
        "reasoning": "short explanation"
      }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text || "{}";
      return JSON.parse(text);
    } catch (error) {
      console.error("AI Vision Match Failed", error);
      return { productId: '', confidence: 0, reasoning: 'Failed to analyze' };
    }
  }
};