import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import styles from "./App.module.css";
import { Hero } from "./components/Hero/Hero";
import { TechStack } from "./components/TechStack/TechStack";
import { Projects } from "./components/Projects/Projects";
import { Approach } from "./components/Approach/Approach";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { MessageBubble } from "./components/MessageBubble/MessageBubble";
import { LoadingDots } from "./components/LoadingDots/LoadingDots";
import { VoiceButton } from "./components/VoiceButton/VoiceButton";
import { useChat } from "./hooks/useChat";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useProfile } from "./hooks/useProfile";

function App() {
  const [inputText, setInputText] = useState("");
  const { messages, isLoading: isChatLoading, sendMessage } = useChat();
  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
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
    if (inputText.trim() && !isChatLoading) {
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

  if (isProfileLoading) {
    return (
      <div className={styles.app}>
        <LoadingDots />
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className={styles.app}>
        <div className={styles.error}>
          Failed to load profile data. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Hero
        name={profile.hero.name}
        title={profile.hero.title}
        experience={profile.hero.experience}
        description={profile.hero.description}
        avatar={profile.hero.avatar}
        social={profile.social}
      />

      <TechStack items={profile.techStack} />

      <Projects projects={profile.projects} />

      <Approach
        development={profile.approach.development}
        aiTools={profile.approach.aiTools}
      />

      <section className={styles.section}>
        <h2>Связаться со мной</h2>
        <ContactForm />
      </section>

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
            placeholder="Ask about my experience, skills, or projects..."
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
    </div>
  );
}

export default App;
