import { useState, useRef, useEffect, useCallback } from 'react';
import { useT, useLocale } from '@/lib/i18n';
import { sendChatMessage, loadChatHistory, saveChatHistory, clearChatHistory, type ChatMessage } from '@/lib/chatService';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SUGGESTED_QUESTIONS_EN = [
  "What's the difference between soluble and insoluble fiber?",
  "How much protein do I need per day?",
  "What are good sources of omega-3 for vegetarians?",
  "Is intermittent fasting safe?",
  "What's the healthiest cooking oil?",
];

const SUGGESTED_QUESTIONS_KO = [
  "수용성 섬유와 불용성 섬유의 차이는 무엇인가요?",
  "하루에 얼마나 많은 단백질이 필요한가요?",
  "채식주의자를 위한 오메가-3 공급원은 무엇인가요?",
  "간헐적 단식은 안전한가요?",
  "가장 건강한 요리용 기름은 무엇인가요?",
];

export default function NutritionChat() {
  const t = useT();
  const [locale] = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChatHistory());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = locale === 'ko' ? SUGGESTED_QUESTIONS_KO : SUGGESTED_QUESTIONS_EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const history = [...messages, userMsg];
      const response = await sendChatMessage(history, locale);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message || 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading, locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      <SEOHead
        titleKey="chat.h1"
        descriptionKey="chat.subtitle"
        path="/chat"
        type="website"
      />

      <div className="min-h-[calc(100vh-64px)] flex flex-col" style={{ backgroundColor: '#f6f5f1' }}>
        {/* Header */}
        <div className="border-b border-deep/5 px-6 py-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-caption text-terracotta mb-2">{t('chat.eyebrow')}</p>
            <h1 className="text-3xl md:text-4xl text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('chat.h1')}
            </h1>
            <p className="text-deep/60">{t('chat.subtitle')}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-deep/40 text-center">{t('chat.suggested')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="p-4 rounded-xl bg-white border border-deep/5 text-left text-sm text-deep/70 hover:border-terracotta/30 hover:bg-terracotta/5 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 ${
                    msg.role === 'user'
                      ? 'bg-deep text-inverse'
                      : 'bg-white border border-deep/5 text-deep/80'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-inverse/40' : 'text-deep/30'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-deep/5 rounded-2xl px-5 py-3.5">
                  <div className="flex items-center gap-2 text-sm text-deep/50">
                    <span className="w-2 h-2 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-1">{t('chat.typing')}</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-deep/5 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-white h-11"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-deep hover:bg-deep/90 text-inverse h-11 px-6"
              >
                {t('chat.send')}
              </Button>
            </form>

            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] text-deep/30">{t('chat.disclaimer')}</p>
              {messages.length > 0 && (
                <button
                  onClick={() => { clearChatHistory(); setMessages([]); }}
                  className="text-[10px] text-deep/30 hover:text-deep/60 transition-colors"
                >
                  Clear history
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
