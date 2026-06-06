import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useT, useLocale } from '@/lib/i18n';
import { sendChatMessage, loadChatSessions, saveChatSessions, type ChatMessage, type ChatSession } from '@/lib/chatService';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Trash2,
  Edit2,
  Plus,
  Menu,
  X,
  Check,
  MessageSquare,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RotateCw,
  MoreHorizontal,
  BookOpen,
  GitBranch,
  Volume2,
  VolumeX,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const SUGGESTED_QUESTIONS_EN = [
  "What's the difference between soluble and insoluble fiber?",
  "How much protein do I need per day?",
  "What are good sources of omega-3 for vegetarians?",
  "Is intermittent fasting safe?",
  "What's the healthiest cooking oil?",
  "How can I reduce my sodium intake?",
  "What are the best low-glycemic foods for diabetics?",
  "Should I avoid saturated fat completely?",
  "What nutrients are most important for heart health?",
  "How do I read a nutrition label effectively?",
  "What's the difference between added sugar and natural sugar?",
  "Are plant-based proteins as complete as animal proteins?",
];

const SUGGESTED_QUESTIONS_KO = [
  "수용성 섬유와 불용성 섬유의 차이는 무엇인가요?",
  "하루에 얼마나 많은 단백질이 필요한가요?",
  "채식주의자를 위한 오메가-3 공급원은 무엇인가요?",
  "간헐적 단식은 안전한가요?",
  "가장 건강한 요리용 기름은 무엇인가요?",
  "나트륨 섭취를 어떻게 줄일 수 있나요?",
  "당뇨병 환자에게 가장 좋은 저혈당 지수 식품은 무엇인가요?",
  "포화지방을 완전히 피해야 하나요?",
  "심장 건강에 가장 중요한 영양소는 무엇인가요?",
  "영양성분표를 효과적으로 읽는 방법은 무엇인가요?",
  "첨가당과 자연당의 차이는 무엇인가요?",
  "식물성 단백질은 동물성 단백질만큼 완전한가요?",
];

function getSourceUrl(source: string): string {
  const lower = source.toLowerCase();
  
  if (lower.includes('who') || lower.includes('world health organization') || lower.includes('세계보건기구')) {
    return 'https://www.who.int';
  }
  if (lower.includes('harvard') || lower.includes('hsph') || lower.includes('하버드')) {
    return 'https://www.hsph.harvard.edu/nutritionsource/';
  }
  if (lower.includes('nih') || lower.includes('national institutes of health') || lower.includes('국립보건원') || lower.includes('pubmed')) {
    return 'https://www.nih.gov';
  }
  if (lower.includes('mayo clinic') || lower.includes('메이요')) {
    return 'https://www.mayoclinic.org';
  }
  if (lower.includes('american heart association') || lower.includes('aha') || lower.includes('미국심장협회')) {
    return 'https://www.heart.org';
  }
  if (lower.includes('fda') || lower.includes('미국 식품의약국')) {
    return 'https://www.fda.gov';
  }
  if (lower.includes('usda') || lower.includes('미국 농무부')) {
    return 'https://www.usda.gov';
  }
  if (lower.includes('nhs')) {
    return 'https://www.nhs.uk';
  }
  if (lower.includes('dietary guidelines')) {
    return 'https://www.dietaryguidelines.gov';
  }
  
  // Korean Institutional sources
  if (lower.includes('식품의약품안전처') || lower.includes('식약처') || lower.includes('mfds')) {
    return 'https://www.mfds.go.kr';
  }
  if (lower.includes('보건복지부') || lower.includes('mohw')) {
    return 'https://www.mohw.go.kr';
  }
  if (lower.includes('한국영양학회') || lower.includes('kns')) {
    return 'https://kns.or.kr';
  }
  if (lower.includes('질병관리청') || lower.includes('kdca')) {
    return 'https://www.kdca.go.kr';
  }
  if (lower.includes('국민건강보험') || lower.includes('nhis')) {
    return 'https://www.nhis.or.kr';
  }

  return `https://www.google.com/search?q=${encodeURIComponent(source + ' nutrition')}`;
}

/** Helper to extract source references from AI output and separate them from text content. */
function parseReferences(content: string): { cleanContent: string; references: { title: string; url: string }[] } {
  const lines = content.split(/\r?\n/);
  let sourcesLineIdx = -1;
  
  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmed = lines[i].trim();
    // Match line starting with "Sources:", "References:", "출처:", "참고:", etc.
    const isHeader = /^(?:###\s*|\*\*|)?(?:Sources?|References?|Citations?|출처|참고문헌|참고)(?:\*\*|)?\s*:/i.test(trimmed);
    const isListItem = /^[*\-•]\s*/.test(trimmed);
    
    if (isHeader && !isListItem) {
      sourcesLineIdx = i;
      break;
    }
  }
  
  if (sourcesLineIdx !== -1) {
    const cleanContent = lines.slice(0, sourcesLineIdx).join('\n').trim();
    const sourcesText = lines.slice(sourcesLineIdx).join('\n');
    
    const colonIndex = sourcesText.indexOf(':');
    const sourcesStr = sourcesText.substring(colonIndex + 1).trim();
    
    const rawRefs = sourcesStr
      .split(/[,;\n\r•*\-]/)
      .map(s => s.trim().replace(/^\d+[\.\)]\s*/, ''))
      .filter(s => s.length > 0 && !s.toLowerCase().startsWith('sources') && !s.toLowerCase().startsWith('출처'));
      
    const references = rawRefs.map(ref => ({
      title: ref,
      url: getSourceUrl(ref)
    }));
    
    return { cleanContent, references };
  }
  
  return { cleanContent: content, references: [] };
}

export default function NutritionChat() {
  const t = useT();
  const [locale] = useLocale();
  const isKo = locale === 'ko';

  // Load or initialize sessions list
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const loaded = loadChatSessions();
    if (loaded.length === 0) {
      const initial: ChatSession = {
        id: `session-${Date.now()}`,
        title: isKo ? '새로운 대화' : 'New Chat',
        messages: [],
        timestamp: Date.now(),
      };
      saveChatSessions([initial]);
      return [initial];
    }
    return loaded;
  });

  // Keep track of active session ID
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const loaded = loadChatSessions();
    return loaded[0]?.id || `session-${Date.now()}`;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedOpen, setSuggestedOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Rename session states
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Message Actions states
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [sharedMessageId, setSharedMessageId] = useState<string | null>(null);
  const [viewSourcesMsgId, setViewSourcesMsgId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = isKo ? SUGGESTED_QUESTIONS_KO : SUGGESTED_QUESTIONS_EN;

  // Retrieve active session from list
  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || sessions[0];
  }, [sessions, activeSessionId]);

  // Messages in active session
  const messages = activeSession?.messages || [];

  // Scroll to bottom when message log changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on session switch
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSessionId]);

  // Focus rename input when editing starts
  useEffect(() => {
    if (editingSessionId) {
      renameInputRef.current?.focus();
    }
  }, [editingSessionId]);

  // Create new session
  const handleNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: isKo ? '새로운 대화' : 'New Chat',
      messages: [],
      timestamp: Date.now(),
    };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    saveChatSessions(updated);
    setActiveSessionId(newSession.id);
    setMobileSidebarOpen(false);
    setInput('');
    setError(null);
  }, [sessions, isKo]);

  // Delete session
  const handleDeleteSession = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      let nextSessions = filtered;
      
      if (filtered.length === 0) {
        const initial: ChatSession = {
          id: `session-${Date.now()}`,
          title: isKo ? '새로운 대화' : 'New Chat',
          messages: [],
          timestamp: Date.now(),
        };
        nextSessions = [initial];
      }
      
      saveChatSessions(nextSessions);
      
      if (activeSessionId === id) {
        setActiveSessionId(nextSessions[0].id);
      }
      
      return nextSessions;
    });
  }, [activeSessionId, isKo]);

  // Start renaming session
  const startRenameSession = useCallback((id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(id);
    setEditTitle(currentTitle);
  }, []);

  // Save renamed title
  const saveRenameSession = useCallback((id: string) => {
    if (!editTitle.trim()) {
      setEditingSessionId(null);
      return;
    }
    setSessions((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, title: editTitle.trim() } : s));
      saveChatSessions(updated);
      return updated;
    });
    setEditingSessionId(null);
  }, [editTitle]);

  // Keyboard support for rename input
  const handleRenameKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      saveRenameSession(id);
    } else if (e.key === 'Escape') {
      setEditingSessionId(null);
    }
  };

  // Send message
  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    let currentSessionId = activeSessionId;

    // Determine if session is empty and needs naming
    const isFirstMessage = messages.length === 0;
    const autoTitle = text.trim().length > 25 ? text.trim().substring(0, 22) + '...' : text.trim();

    // Create session if active session doesn't exist
    if (!activeSession) {
      handleNewChat();
      return;
    }

    // Update session locally
    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            title: isFirstMessage ? autoTitle : s.title,
            messages: [...s.messages, userMsg],
            timestamp: Date.now(),
          };
        }
        return s;
      });
      saveChatSessions(updated);
      return updated;
    });

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

      setSessions((prev) => {
        const updated = prev.map((s) => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              messages: [...s.messages, assistantMsg],
              timestamp: Date.now(),
            };
          }
          return s;
        });
        saveChatSessions(updated);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || (isKo ? '답변을 가져오지 못했습니다. 다시 시도해 주세요.' : 'Failed to get response. Please try again.'));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [messages, isLoading, locale, activeSessionId, activeSession, handleNewChat, isKo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // Initialize voices and clean up speaking when component unmounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  }, []);

  const handleFeedback = useCallback((messageId: string, feedbackType: 'like' | 'dislike') => {
    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: s.messages.map((m) => {
              if (m.id === messageId) {
                const newFeedback = m.feedback === feedbackType ? undefined : feedbackType;
                return { ...m, feedback: newFeedback };
              }
              return m;
            }),
          };
        }
        return s;
      });
      saveChatSessions(updated);
      return updated;
    });
  }, [activeSessionId]);

  const handleShare = useCallback((id: string, text: string) => {
    const shareData = {
      title: 'Vital Nutrition Advice',
      text: text,
    };
    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setSharedMessageId(id);
      setTimeout(() => setSharedMessageId(null), 2000);
    }
  }, []);

  const handleRetry = useCallback(async (messageId: string) => {
    if (isLoading) return;

    const targetMsgIdx = messages.findIndex((m) => m.id === messageId);
    if (targetMsgIdx === -1) return;

    const precedingUserMsg = messages[targetMsgIdx - 1];
    if (!precedingUserMsg || precedingUserMsg.role !== 'user') return;

    const truncatedMessages = messages.slice(0, targetMsgIdx);

    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: truncatedMessages,
            timestamp: Date.now(),
          };
        }
        return s;
      });
      saveChatSessions(updated);
      return updated;
    });

    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(truncatedMessages, locale);

      const newAssistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setSessions((prev) => {
        const updated = prev.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...truncatedMessages, newAssistantMsg],
              timestamp: Date.now(),
            };
          }
          return s;
        });
        saveChatSessions(updated);
        return updated;
      });
    } catch (err: any) {
      setError(err.message || (isKo ? '답변을 다시 가져오지 못했습니다.' : 'Failed to retry. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, activeSessionId, locale, isKo]);

  const handleBranchChat = useCallback((messageId: string) => {
    const targetMsgIdx = messages.findIndex((m) => m.id === messageId);
    if (targetMsgIdx === -1) return;

    const branchedMessages = messages.slice(0, targetMsgIdx + 1);
    const firstUserMsg = branchedMessages.find(m => m.role === 'user');
    const baseTitle = firstUserMsg ? firstUserMsg.content : (isKo ? '가지 쳐진 대화' : 'Branched Chat');
    const autoTitle = baseTitle.length > 25 ? baseTitle.substring(0, 22) + '...' : baseTitle;

    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: `${isKo ? '가지 치기: ' : 'Branch: '}${autoTitle}`,
      messages: branchedMessages.map(m => ({ ...m, id: `${m.role}-${Date.now()}-${Math.random()}` })),
      timestamp: Date.now(),
    };

    setSessions((prev) => {
      const updated = [newSession, ...prev];
      saveChatSessions(updated);
      return updated;
    });
    setActiveSessionId(newSession.id);
    setMobileSidebarOpen(false);
    setError(null);
  }, [messages, isKo]);

  const handleReadAloud = useCallback((messageId: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const plainText = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[#*_\-~>]/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .trim();

    if (!plainText) return;

    const utterance = new SpeechSynthesisUtterance(plainText);
    
    // Choose the best voice
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = locale === 'ko' ? 'ko' : 'en';
    const langMatch = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
    
    let selectedVoice = null;
    if (langMatch.length > 0) {
      // 1. Try online neural/natural voices (Microsoft Online or Google Online)
      selectedVoice = langMatch.find(v => v.name.toLowerCase().includes('online') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('neural'));
      // 2. Try Google voices
      if (!selectedVoice) {
        selectedVoice = langMatch.find(v => v.name.toLowerCase().includes('google'));
      }
      // 3. Try Premium/Enhanced local voices
      if (!selectedVoice) {
        selectedVoice = langMatch.find(v => v.name.toLowerCase().includes('premium') || v.name.toLowerCase().includes('enhanced'));
      }
      // 4. Fallback to first matching language voice
      if (!selectedVoice) {
        selectedVoice = langMatch[0];
      }
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = locale === 'ko' ? 'ko-KR' : 'en-US';

    // Set natural speaking rate
    utterance.rate = 0.95; 

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  }, [speakingMessageId, locale]);

  // Sidebar Inner Content Component
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-[#fcfbf9]">
      {/* Sidebar Header */}
      <div className="px-6 py-4 border-b border-deep/5 flex items-center justify-between">
        <span className="text-sm font-semibold text-deep/80 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-terracotta" />
          {isKo ? '대화 목록' : 'Chat History'}
        </span>
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-deep/5 text-deep/60"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-4 py-3">
        <Button
          onClick={handleNewChat}
          className="w-full bg-white hover:bg-deep/5 text-deep border border-deep/10 shadow-sm flex items-center justify-center gap-2 h-10 rounded-xl font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          {isKo ? '새 대화 시작' : 'New Chat'}
        </Button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {sessions.map((session) => {
          const isActive = session.id === activeSessionId;
          const isEditing = session.id === editingSessionId;

          return (
            <div
              key={session.id}
              onClick={() => {
                if (!isEditing) {
                  setActiveSessionId(session.id);
                  setMobileSidebarOpen(false);
                  setError(null);
                }
              }}
              className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-l-4 ${
                isActive
                  ? 'bg-[#4a7c59]/8 text-[#4a7c59] border-[#4a7c59] font-medium'
                  : 'border-transparent hover:bg-deep/5 text-deep/70'
              }`}
            >
              {isEditing ? (
                <div className="flex items-center gap-1.5 w-full mr-2" onClick={(e) => e.stopPropagation()}>
                  <Input
                    ref={renameInputRef}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, session.id)}
                    className="h-8 py-1 px-2 text-xs bg-white border-deep/15 flex-1"
                  />
                  <button
                    onClick={() => saveRenameSession(session.id)}
                    className="p-1 hover:bg-deep/10 text-emerald-600 rounded-md"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEditingSessionId(null)}
                    className="p-1 hover:bg-deep/10 text-red-500 rounded-md"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-w-0 pr-8">
                  <p className="text-xs truncate">{session.title}</p>
                  <p className={`text-[9px] mt-0.5 ${isActive ? 'text-[#4a7c59]/60' : 'text-deep/35'}`}>
                    {session.messages.length} {isKo ? '개의 메시지' : 'messages'}
                  </p>
                </div>
              )}

              {/* Edit / Delete overlay (visible on group hover / desktop) */}
              {!isEditing && (
                <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity bg-gradient-to-l from-[#fcfbf9] via-[#fcfbf9] to-transparent pl-4 py-1.5">
                  <button
                    onClick={(e) => startRenameSession(session.id, session.title, e)}
                    className="p-1 rounded hover:bg-deep/10 text-deep/50 hover:text-deep/80"
                    title={isKo ? '이름 변경' : 'Rename'}
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="p-1 rounded hover:bg-red-50 text-red-500/70 hover:text-red-600"
                    title={isKo ? '대화 삭제' : 'Delete'}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    handleRenameKeyDown(e, id);
  };

  return (
    <>
      <SEOHead
        titleKey="chat.h1"
        descriptionKey="chat.subtitle"
        path="/chat"
        type="website"
        dateModified="2026-06-06"
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Chat', path: '/chat' }]}
      />

      <div className="min-h-[calc(100vh-64px)] flex flex-row" style={{ backgroundColor: '#f6f5f1' }}>
        {/* Desktop Sidebar Panel */}
        <aside className="w-80 border-r border-deep/5 bg-white flex-shrink-0 hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16">
          {renderSidebarContent()}
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-deep/20 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Drawer container */}
            <aside className="relative flex flex-col w-72 bg-white h-full shadow-xl z-10">
              {renderSidebarContent()}
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-64px)] overflow-hidden">
          {/* Main Top Header */}
          <header className="h-16 border-b border-deep/5 bg-white px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3 w-full min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden text-deep/60"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-sm font-semibold text-deep truncate">
                {activeSession?.title || (isKo ? '무엇이든 물어보세요' : 'Nutrition Q&A')}
              </h1>
            </div>
          </header>

          {/* Messages Wrapper */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.length === 0 && (
                <div className="space-y-6">
                  {/* Hero headers */}
                  <div className="text-center py-6">
                    <p className="text-caption text-terracotta mb-2">{t('chat.eyebrow')}</p>
                    <h2 className="text-3xl text-deep mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {t('chat.h1')}
                    </h2>
                    <p className="text-sm text-deep/60 max-w-lg mx-auto">{t('chat.subtitle')}</p>
                  </div>

                  {/* Ask question input */}
                  <div className="bg-white rounded-xl border border-deep/5 p-4 shadow-sm">
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
                  </div>

                  {/* Suggested questions dropdown */}
                  <Collapsible open={suggestedOpen} onOpenChange={setSuggestedOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-white border border-deep/5 text-left hover:border-terracotta/30 hover:bg-terracotta/5 transition-all shadow-sm">
                      <span className="text-sm font-medium text-deep/80">{t('chat.suggested')}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-deep/40 transition-transform duration-200 ${suggestedOpen ? 'rotate-180' : ''}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        {suggestedQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(q)}
                            className="p-4 rounded-xl bg-white border border-deep/5 text-left text-sm text-deep/70 hover:border-terracotta/30 hover:bg-terracotta/5 transition-all shadow-sm"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}

              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                const { cleanContent, references } = isAssistant
                  ? parseReferences(msg.content)
                  : { cleanContent: msg.content, references: [] };

                return (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-deep text-inverse'
                          : 'bg-white border border-deep/5 text-deep/80'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-3 last:mb-0 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 last:mb-0 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            h1: ({ children }) => <h1 className="text-base font-semibold mt-3 mb-1.5 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-semibold mt-3 mb-1.5 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold mt-3 mb-1.5 first:mt-0">{children}</h3>,
                            hr: () => <hr className="my-3 border-deep/10" />,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-terracotta/40 pl-3 my-3 opacity-80 italic">{children}</blockquote>
                            ),
                            code: ({ className, children }) =>
                              className?.includes('language-') ? (
                                <code className="block bg-deep/5 rounded-lg p-3 my-3 text-xs font-mono overflow-x-auto whitespace-pre">{children}</code>
                              ) : (
                                <code className="bg-deep/5 rounded px-1.5 py-0.5 text-[0.85em] font-mono">{children}</code>
                              ),
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-3">
                                <table className="w-full text-left border-collapse">{children}</table>
                              </div>
                            ),
                            th: ({ children }) => (
                              <th className="border border-deep/10 px-2.5 py-1.5 font-semibold bg-deep/5">{children}</th>
                            ),
                            td: ({ children }) => <td className="border border-deep/10 px-2.5 py-1.5">{children}</td>,
                            a: ({ children, href }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="underline opacity-80 hover:opacity-100">
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {cleanContent}
                        </ReactMarkdown>
                      </div>

                      {/* Short list of reference links for user to learn more */}
                      {isAssistant && references.length > 0 && (
                        <div className="mt-3.5 pt-2 border-t border-deep/5 flex items-center gap-1.5 flex-wrap text-xs text-deep/60">
                          <span className="font-semibold text-deep/45">{isKo ? '더 알아보기:' : 'Learn More:'}</span>
                          <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                            {references.map((ref, idx) => (
                              <a
                                key={idx}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-[#4a7c59] hover:text-[#3d664a] font-semibold transition-colors"
                              >
                                {ref.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Message Actions Row */}
                      {isAssistant && (
                        <div className="flex items-center gap-1 mt-3.5 pt-2 border-t border-deep/5 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id, cleanContent)}
                            className="p-1.5 rounded-lg hover:bg-deep/5 text-deep/40 hover:text-deep/80 transition-colors"
                            title={isKo ? '복사' : 'Copy'}
                          >
                            {copiedMessageId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleFeedback(msg.id, 'like')}
                            className={`p-1.5 rounded-lg hover:bg-deep/5 transition-colors ${
                              msg.feedback === 'like'
                                ? 'text-[#4a7c59] hover:text-[#3d664a]'
                                : 'text-deep/40 hover:text-deep/80'
                            }`}
                            title={isKo ? '좋아요' : 'Like'}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" fill={msg.feedback === 'like' ? 'currentColor' : 'none'} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleFeedback(msg.id, 'dislike')}
                            className={`p-1.5 rounded-lg hover:bg-deep/5 transition-colors ${
                              msg.feedback === 'dislike'
                                ? 'text-[#d95c39] hover:text-rose-700'
                                : 'text-deep/40 hover:text-deep/80'
                            }`}
                            title={isKo ? '싫어요' : 'Dislike'}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" fill={msg.feedback === 'dislike' ? 'currentColor' : 'none'} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleShare(msg.id, cleanContent)}
                            className="p-1.5 rounded-lg hover:bg-deep/5 text-deep/40 hover:text-deep/80 transition-colors"
                            title={isKo ? '공유' : 'Share'}
                          >
                            {sharedMessageId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRetry(msg.id)}
                            className={`p-1.5 rounded-lg hover:bg-deep/5 text-deep/40 hover:text-deep/80 transition-colors ${
                              isLoading ? 'animate-spin opacity-50' : ''
                            }`}
                            title={isKo ? '다시 시도' : 'Retry'}
                            disabled={isLoading}
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>

                          {/* Dropdown Menu for More Options */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="p-1.5 rounded-lg hover:bg-deep/5 text-deep/40 hover:text-deep/80 transition-colors"
                                title={isKo ? '더 보기' : 'More'}
                              >
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-52 bg-white border border-deep/10 shadow-lg rounded-xl p-1.5 z-[100]">
                              {/* Heading showing timestamp */}
                              <DropdownMenuLabel className="text-[10px] text-deep/40 font-semibold px-2.5 py-1.5 border-b border-deep/5 mb-1.5">
                                {new Date(msg.timestamp).toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </DropdownMenuLabel>
                              
                              <DropdownMenuItem
                                onClick={() => setViewSourcesMsgId(msg.id)}
                                className="flex items-center gap-2 px-2.5 py-2 text-xs text-deep/70 hover:bg-deep/5 rounded-lg cursor-pointer"
                              >
                                <BookOpen className="w-3.5 h-3.5 text-deep/40" />
                                <span>{isKo ? '출처 보기' : 'View sources'}</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleBranchChat(msg.id)}
                                className="flex items-center gap-2 px-2.5 py-2 text-xs text-deep/70 hover:bg-deep/5 rounded-lg cursor-pointer"
                              >
                                <GitBranch className="w-3.5 h-3.5 text-deep/40" />
                                <span>{isKo ? '새 대화로 분기' : 'Branch in new chat'}</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleReadAloud(msg.id, cleanContent)}
                                className="flex items-center gap-2 px-2.5 py-2 text-xs text-deep/70 hover:bg-deep/5 rounded-lg cursor-pointer"
                              >
                                {speakingMessageId === msg.id ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                                    <span className="text-rose-500">{isKo ? '낭독 중지' : 'Stop reading'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-deep/40" />
                                    <span>{isKo ? '소리내어 읽기' : 'Read aloud'}</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}

                      <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-inverse/40' : 'text-deep/30'} text-right`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-deep/5 rounded-2xl px-5 py-3.5 shadow-sm">
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
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600 shadow-sm">
                    {error}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sticky Input Bar at Bottom (shown only when messages exist) */}
          {messages.length > 0 && (
            <div className="border-t border-deep/5 px-6 py-4 bg-white flex-shrink-0">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chat.placeholder')}
                    className="flex-1 bg-[#f6f5f1]/50 border-deep/10 h-11"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-deep hover:bg-deep/90 text-inverse h-11 px-6 shadow-sm"
                  >
                    {t('chat.send')}
                  </Button>
                </form>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-[10px] text-deep/30">{t('chat.disclaimer')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sources dialogue viewer */}
      <Dialog open={!!viewSourcesMsgId} onOpenChange={(open) => !open && setViewSourcesMsgId(null)}>
        <DialogContent className="sm:max-w-[425px] bg-[#fcfbf9] border border-deep/10 rounded-2xl shadow-xl p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-deep tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-terracotta" />
              {isKo ? '참고 문헌 및 출처 목록' : 'Sources & References'}
            </DialogTitle>
            <DialogDescription className="text-xs text-deep/60 mt-1 leading-relaxed">
              {isKo
                ? '이 답변을 보증하고 입증하기 위해 참고한 신뢰할 수 있는 학술 연구 및 공인 건강 관련 기관 자료입니다.'
                : 'Scientific research databases and institutional guidelines cited to construct this response.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {viewSourcesMsgId && (
              (() => {
                const targetMsg = messages.find(m => m.id === viewSourcesMsgId);
                if (!targetMsg) return null;
                const { references } = parseReferences(targetMsg.content);
                if (references.length === 0) {
                  return (
                    <p className="text-sm text-deep/50 italic py-4 text-center">
                      {isKo ? '이 대화에는 인용된 구체적인 문헌이 없습니다.' : 'No explicit sources cited in this message.'}
                    </p>
                  );
                }
                return (
                  <ul className="space-y-2">
                    {references.map((ref, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start p-3 bg-white rounded-xl border border-deep/5 text-xs text-deep/75 leading-relaxed shadow-sm">
                        <span className="w-5 h-5 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="font-semibold text-deep truncate block" title={ref.title}>{ref.title}</span>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#4a7c59] hover:underline inline-flex items-center gap-1 mt-0.5 font-semibold transition-colors"
                          >
                            {isKo ? '참고 자료 방문' : 'Visit source'}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              })()
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
