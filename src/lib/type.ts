import { generateText } from 'ai';
export interface GameMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  imageLoading?: string;
}

export interface GeneratedImage {
  base64Data: string;
  mediaType: string;
  uint8ArrayData?: Uint8Array;
}


export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateStoryRequest {
  userMessage: string;
  conversationHistory: ConversationMessage[];
  isStart: boolean;
}

export interface generateImageRequest{
  imagePrompt: string;
}

export interface GenerateStoryResponse {
  narrative: string;
  imagePrompt: GeneratedImage;
}