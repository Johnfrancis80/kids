
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Always initialize with an object containing the apiKey
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// --- Text Content Generation ---

// Added missing greeting function for Sparky the mascot
export const generateSparkyGreeting = async (name: string, age: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Sparky, a friendly mascot for an English learning app for kids. Greet a child named ${name} who is ${age} years old. Keep it very short (one sentence), encouraging, and fun.`,
    });
    // Property access .text (not a method) is correct for GoogleGenAI responses
    return response.text || "Hi there! I'm Sparky! Let's play!";
  } catch (error) {
    return "Hi there! I'm Sparky! Let's play!";
  }
};

export const generateQuiz = async (category: string, age: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 5-question multiple choice quiz about ${category} for a ${age} year old child. 
      Return ONLY a JSON array of objects with keys: "question", "options" (array of 3 strings), and "correctAnswer" (must be one of the options).`,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Gen Error:", error);
    return [];
  }
};

export const generateStory = async (topic: string, age: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a fun, educational story for a ${age} year old about ${topic}. Keep it to 4 short paragraphs. Each paragraph should be simple.`,
    });
    return response.text || "Once upon a time...";
  } catch (error) {
    return "Let's imagine a great story together!";
  }
};

// --- Image Generation for Coloring ---

export const generateColoringPage = async (prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A simple black and white line art coloring page for kids of: ${prompt}. White background, thick black outlines, no shading.` }]
      },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });
    
    // Iterate through parts to find the image data as recommended
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

// --- Text to Speech ---

export const playTTS = async (text: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly for a child: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const arrayBuffer = base64ToUint8Array(base64Audio);
      const audioBuffer = await decodeAudioData(arrayBuffer, audioCtx, 24000, 1);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};

// --- Audio Utilities ---

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
