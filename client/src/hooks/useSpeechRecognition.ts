import { useState, useEffect, useCallback, useRef } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFinalTextRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsSupported(false);
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      console.warn("SpeechRecognition API not supported");
      setIsSupported(false);
      return;
    }

    let recognition: any = null;
    try {
      recognition = new SpeechRecognitionAPI();
    } catch (err) {
      console.error("Failed to construct SpeechRecognition:", err);
      setIsSupported(false);
      return;
    }

    if (!recognition) {
      setIsSupported(false);
      return;
    }

    // Настройки
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ru-RU";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let currentFinalText = "";
      let currentInterimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          currentFinalText += text;
        } else {
          currentInterimText += text;
        }
      }

      if (currentFinalText && currentFinalText !== lastFinalTextRef.current) {
        lastFinalTextRef.current = currentFinalText;
        setTranscript((prev) => {
          const newText = prev
            ? `${prev} ${currentFinalText}`
            : currentFinalText;
          return newText;
        });
      }

      if (currentInterimText) {
        console.debug("Interim transcript:", currentInterimText);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Игнорируем ошибки при очистке
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.warn("Speech recognition not available");
      return;
    }

    try {
      recognitionRef.current.abort();
    } catch {
      // Игнорируем ошибки
    }

    setTranscript("");
    lastFinalTextRef.current = "";
    setIsListening(true);

    try {
      recognitionRef.current.start();

      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          try {
            recognitionRef.current.stop();
          } catch {
            // Игнорируем ошибки
          }
        }
      }, 15000);
    } catch (error) {
      console.error("Failed to start recognition:", error);
      setIsListening(false);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Failed to stop recognition:", error);
      }
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [isListening]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  };
}
