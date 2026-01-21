import { GoogleGenAI } from "@google/genai";
import { PromptResult } from "../types";

// Helper para instanciar com a chave atualizada (necessário para fluxo de chave do usuário no Veo)
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCinematicPrompt = async (idea: string): Promise<PromptResult> => {
  try {
    const ai = getAI();
    const systemInstruction = `
      Você é um especialista em 'Prompt Engineering' para modelos de geração de vídeo.
      Seu objetivo é transformar uma ideia simples do usuário em um prompt altamente detalhado e cinematográfico.

      Retorne APENAS um objeto JSON válido (sem markdown, sem code block) com a seguinte estrutura:
      {
        "prompt": "O prompt detalhado em inglês (padrão da indústria) descrevendo sujeito, ação, ambiente, iluminação, movimento de câmera e estilo.",
        "negativePrompt": "O que evitar (ex: morphing, bad hands, distortion)",
        "settings": "Sugestão de configurações (ex: Resolution 16:9, Motion 5)"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transforme esta ideia em um prompt cinematográfico profissional: "${idea}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as PromptResult;
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};

export const generateMarketingImage = async (prompt: string, size: '1K' | '2K' | '4K'): Promise<string> => {
  try {
    const ai = getAI();
    // gemini-3-pro-image-preview supports image generation with config
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          imageSize: size
        }
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generateVideoWithVeo = async (
  prompt: string, 
  imageBase64: string, 
  mimeType: string, 
  aspectRatio: '16:9' | '9:16'
): Promise<string> => {
  try {
    const ai = getAI();
    
    // O modelo Veo requer imageBytes sem o prefixo data:image/...
    // Assumindo que imageBase64 já vem limpo ou limpamos aqui se necessário
    // Mas o VideoGenerator vai passar raw base64
    
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt, // Prompt é opcional mas recomendado para guiar a animação
      image: {
        imageBytes: imageBase64,
        mimeType: mimeType, 
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    // Polling loop
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5s
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("Video generation failed or returned no URI");

    // Fetch the video content using the URI and the API key
    const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("Error generating video with Veo:", error);
    throw error;
  }
};
