import { ArrowRight, MessageCircle } from "lucide-react";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { LoadingDots } from "../LoadingDots/LoadingDots";
import styles from "./AiAssistant.module.css";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { useChat } from "../../hooks/useChat";
import { VoiceButton } from "../VoiceButton/VoiceButton";

const AiAssistant = () => {
  const [inputText, setInputText] = useState("");
  const { messages, isLoading: isChatLoading, sendMessage } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInputText((prev) => prev + (prev ? " " : "") + transcript);
    }
  }, [transcript]);

  const handleSend = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputText.trim() && !isChatLoading) {
        sendMessage(inputText);
        setInputText("");
        inputRef.current?.focus();
      }
    },
    [inputText, isChatLoading, sendMessage],
  );

  const handleVoiceClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className={styles.chatSection}>
      <div className={styles.chatHeader}>
        <MessageCircle size={48} />
        <h2>AI Ассистент</h2>
        <p>Спросите о моём опыте, навыках или проектах!</p>
      </div>

      {messages.length > 0 && (
        <div className={styles.messagesArea}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isChatLoading && <LoadingDots />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form className={styles.promptBar} onSubmit={handleSend}>
        {isSupported && (
          <VoiceButton
            isListening={isListening}
            onClick={handleVoiceClick}
            disabled={isChatLoading}
          />
        )}
        <input
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Спроси об опыте, навыках, проектах..."
          disabled={isChatLoading}
        />
        <button type="submit" disabled={isChatLoading || !inputText.trim()}>
          <ArrowRight size={18} />
        </button>
      </form>
      {isListening && (
        <div className={styles.listeningIndicator}>Listening...</div>
      )}
    </section>
  );
};
export default memo(AiAssistant);
