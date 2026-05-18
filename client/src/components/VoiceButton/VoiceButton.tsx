import React from "react";
import { Mic, MicOff } from "lucide-react";
import styles from "./VoiceButton.module.css";

interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${isListening ? styles.listening : ""}`}
      aria-label={isListening ? "Stop recording" : "Start recording"}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};
