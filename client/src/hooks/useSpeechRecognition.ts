import { useState, useEffect, useCallback, useRef } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFinalTextRef = useRef<string>("");
  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ru-RU";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let currentFinalText = "";
      let currentInterimText = "";

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }

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

        silenceTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            try {
              recognitionRef.current.stop();
            } catch (stopError) {
              console.debug("Silence stop error:", stopError);
            }
          }
        }, 2000);
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
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (abortError) {
          if (abortError instanceof Error && abortError.name !== "AbortError") {
            console.debug(
              "Cleanup abort error (non-critical):",
              abortError.message,
            );
          }
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [isListening]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.warn("Speech recognition not available");
      return;
    }

    try {
      recognitionRef.current.abort();
    } catch (abortError) {
      console.debug("Abort before start error:", abortError);
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
          } catch (stopError) {
            console.debug("Timeout stop error:", stopError);
          }
        }
      }, 15000);
    } catch (startError) {
      console.error("Failed to start recognition:", startError);
      setIsListening(false);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (stopError) {
        console.error("Failed to stop recognition:", stopError);
      }
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
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
