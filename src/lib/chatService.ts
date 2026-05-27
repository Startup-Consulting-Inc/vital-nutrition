import { sendChatViaAPI } from './apiClient';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export { sendChatViaAPI as sendChatMessage };

/* ------------------------------------------------------------------ */
/*  Local chat history persistence                                     */
/* ------------------------------------------------------------------ */

const CHAT_STORAGE_KEY = 'vital.chatHistory.v1';

export function loadChatHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore
  }
}

export function clearChatHistory(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CHAT_STORAGE_KEY);
}
