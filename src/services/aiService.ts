import { Product } from "../lib/types";

// NOTE: Google GenAI SDK usage has been temporarily removed to fix deployment issues.
// This service now returns static mock responses.

export const AIService = {
  getSystemInstruction: (products: Product[]) => {
    return "";
  },

  createChat: (products: Product[]) => {
    return {
      sendMessage: async (props: { message: string }) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          text: "Twinkle AI is currently undergoing scheduled maintenance. Please browse our collection manually or check back later! ✨"
        };
      },
    };
  },

  parseResponse: (text: string) => {
    return { text: text, recommendations: [] };
  },

  matchImageToProduct: async (imageBase64: string, products: Product[]): Promise<{ productId: string, confidence: number, reasoning: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { 
      productId: '', 
      confidence: 0, 
      reasoning: 'AI Vision service is temporarily unavailable.' 
    };
  }
};