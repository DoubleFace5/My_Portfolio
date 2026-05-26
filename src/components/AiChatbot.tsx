import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, Zap, Sparkles, RefreshCw, XCircle, Terminal, HelpCircle } from "lucide-react";
import { Message } from "../types";

interface AiChatbotProps {
  initialSkillPrompt: string;
  onClearSkillPrompt: () => void;
}

export default function AiChatbot({ initialSkillPrompt, onClearSkillPrompt }: AiChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am Fatma's AI Skills Advisor. Ask me anything about her expertise in Flutter, Full Stack JS, PostgreSQL, or her multimedia motion work in After Effects! Click one of the preset chips below, or write your own inquiry.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    { label: "Flutter Mobile Experience", text: "Tell me about Fatma's project experience with Flutter and mobile app engineering." },
    { label: "Academic Journey", text: "Where did Fatma study, and what did she cover in her 2024-2025 and 2025-2026 courses?" },
    { label: "Database Proficiencies", text: "Which database management systems does Fatma know, and what is her depth of SQL?" },
    { label: "After Effects & Motion", text: "Explain Fatma's skill with After Effects. How does she merge motion design with development?" },
  ];

  // Auto-scroll to latest response
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Synchronize when a skill card is clicked in SkillsGrid
  useEffect(() => {
    if (initialSkillPrompt) {
      const formattedPrompt = `Tell me more about Fatma's proficiency in ${initialSkillPrompt} and how she applies it.`;
      setInput(formattedPrompt);
      // Automatically send
      triggerSend(formattedPrompt);
      onClearSkillPrompt();
    }
  }, [initialSkillPrompt]);

  const triggerSend = async (messageText: string) => {
    if (!messageText.trim()) return;
    setErrorText(null);

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: Message = {
      role: "user",
      text: messageText,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build full history to maintain conversational context
      // Maps to matching server endpoint format
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed server communications.");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err?.message || "An unexpected issue occurred while chatting with Fatma's advisor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerSend(input);
  };

  const clearConversation = () => {
    setMessages([
      {
        role: "model",
        text: "Conversation history cleared. What else would you like to know about Fatma's academic background or digital development skills?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setErrorText(null);
  };

  return (
    <section id="ai-assistant" className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
      
      {/* Container holding chatbot card */}
      <div className="bg-[#E3CD8B] rounded-3xl p-6 md:p-8 border border-sand/30 shadow-2xl flex flex-col gap-6 text-[#37463D]" id="chat-widget-frame" >
        
        {/* Chat Widget Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#37463D]/15 pb-6" id="chat-header">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-[#5D7052] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse text-sand" />
            </span>
            <div>
              <h3 className="font-extrabold text-xl text-[#37463D] leading-tight font-serif italic">
                Ask Fatma
              </h3>
              <p className="text-[11px] text-[#37463D]/80 font-mono uppercase tracking-widest font-semibold">Always Active • Gemini AI</p>
            </div>
          </div>

          <button
            onClick={clearConversation}
            className="self-start sm:self-center bg-[#37463D]/15 hover:bg-[#37463D]/25 text-[#37463D] px-4 py-2 rounded-full text-[10px] font-mono font-black tracking-widest transition-all duration-300"
            id="chat-btn-clear"
          >
            RESET DISCOURSE
          </button>
        </div>

        {/* Message Thread Scrollport */}
        <div className="bg-[#FAF8F5]/85 rounded-2xl border border-[#37463D]/10 p-4 h-96 overflow-y-auto flex flex-col gap-4" id="chat-message-viewport">
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${isUser ? "self-end items-end" : "self-start items-start"}`}
                id={`chat-msg-row-${idx}`}
              >
                {/* Message Speech bubble */}
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? "bg-[#37463D] text-[#FAF8F5] rounded-tr-none"
                      : "bg-white/80 text-[#37463D] rounded-tl-none border border-[#37463D]/5"
                  }`}
                  id={`chat-msg-bubble-${idx}`}
                >
                  <p className="whitespace-pre-line font-medium">{m.text}</p>
                </div>
                {/* Meta time caption */}
                <span className="text-[9px] text-[#37463D]/50 font-mono mt-1 px-1">{m.timestamp}</span>
              </div>
            );
          })}

          {/* Prompt Loading feedback block */}
          {isLoading && (
            <div className="self-start flex flex-col gap-1 items-start max-w-[85%] animate-pulse" id="chat-loading-indicator">
              <div className="bg-white/60 text-[#37463D]/80 p-4 rounded-3xl rounded-tl-none text-xs font-mono flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#5D7052]" />
                <span>AI Advisor matching dossier parameters...</span>
              </div>
            </div>
          )}

          {/* Fault Feedback notification */}
          {errorText && (
            <div className="bg-[#C18845]/15 border-l-4 border-[#C18845] rounded-2xl p-4 flex gap-3 text-[#37463D] text-xs sm:text-sm" id="chat-error-log">
              <XCircle className="w-5 h-5 text-[#C18845] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Model Request Status</p>
                <p className="text-xs text-[#37463D]/80 mt-1">{errorText}</p>
                <p className="text-[10px] font-mono mt-2 text-[#C18845] font-black uppercase tracking-wider">Please confirm standard API connectivity.</p>
              </div>
            </div>
          )}

          {/* Scroll anchor marker */}
          <div ref={listEndRef} />
        </div>

        {/* Chip Selectors / Preset Prompts Helper row */}
        <div id="chat-preset-container">
          <span className="text-[10px] font-mono font-black tracking-widest text-[#37463D]/60 block mb-2.5 uppercase">TAP IMMEDIATE QUESTION:</span>
          <div className="flex flex-wrap gap-2" id="chat-preset-chips">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => triggerSend(p.text)}
                disabled={isLoading}
                className="bg-white/60 text-[#37463D] hover:bg-white/95 border border-[#37463D]/10 rounded-full px-4 py-2 text-xs font-bold shadow-sm cursor-pointer transition-all duration-300 disabled:opacity-50"
                id={`preset-chip-${idx}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input dispatch Form */}
        <form onSubmit={handleFormSubmit} className="flex gap-2" id="chat-dispatch-form">
          <input
            type="text"
            placeholder="Type your question about Fatma..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-white/40 px-5 py-3.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#5D7052] text-sm text-[#37463D] placeholder-[#37463D]/50 font-medium disabled:opacity-65"
            id="chat-keyboard-input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#5D7052] hover:bg-[#6D8062] text-white p-3.5 rounded-full shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-40 cursor-pointer"
            id="chat-btn-submit"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>

        {/* Footer legalities or notes */}
        <p className="text-[10px] text-[#37463D]/60 text-center font-mono uppercase tracking-wider" id="chat-legal-disclaimer">
          verified curriculum advisor • Tunis 2026
        </p>

      </div>
    </section>
  );
}
