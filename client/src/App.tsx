import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import styles from "./App.module.css";
import { MessageBubble } from "./components/MessageBubble/MessageBubble";
import { LoadingDots } from "./components/LoadingDots/LoadingDots";
import { VoiceButton } from "./components/VoiceButton/VoiceButton";
import { useChat } from "./hooks/useChat";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

function App() {
  const [inputText, setInputText] = useState("");
  const { messages, isLoading, sendMessage } = useChat();
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInputText((prev) => prev + (prev ? " " : "") + transcript);
    }
  }, [transcript]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText);
      setInputText("");
      inputRef.current?.focus();
    }
  };

  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <main className={styles.screen}>
      <div className={styles.cardIcon}>
        <MessageCircle size={28} strokeWidth={1.5} color="white" fill="white" />
      </div>

      <section className={styles.content}>
        <p className={styles.greeting}>Hi there!</p>
        <h1 className={styles.title}>What would you like to know?</h1>
        <p className={styles.subtitle}>
          Use one of the most common prompts below
          <br />
          or ask your own question
        </p>
      </section>

      {messages.length > 0 && (
        <div className={styles.messagesArea}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <LoadingDots />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form className={styles.promptBar} onSubmit={handleSend}>
        {isSupported && (
          <VoiceButton
            isListening={isListening}
            onClick={handleVoiceClick}
            disabled={isLoading}
          />
        )}

        <input
          ref={inputRef}
          className={styles.promptInput}
          type="text"
          placeholder="Ask whatever you want"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />

        <button
          type="submit"
          className={styles.sendButton}
          disabled={isLoading || !inputText.trim()}
          aria-label="Send"
        >
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </form>

      {isListening && (
        <div className={styles.listeningIndicator}>Listening... Speak now</div>
      )}
    </main>
  );
}

export default App;
