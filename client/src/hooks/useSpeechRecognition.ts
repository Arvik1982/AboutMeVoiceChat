import { useState, useEffect, useCallback, useRef } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFinalTextRef = useRef<string>("");
  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recentPhrasesRef = useRef<string[]>([]);

  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  }, []);

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

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);

      recentPhrasesRef.current = [];
    };

    recognition.onresult = (event: any) => {
      let newFinalText = "";
      let currentInterimText = "";

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript.trim();

        if (result.isFinal) {
          newFinalText += text;
        } else {
          currentInterimText += text;
        }
      }

      if (newFinalText) {
        const phrases = newFinalText
          .split(/[.!?;،،\n]+/)
          .filter((p) => p.trim().length > 0);

        for (const phrase of phrases) {
          const trimmedPhrase = phrase.trim();

          if (
            trimmedPhrase &&
            !recentPhrasesRef.current.includes(trimmedPhrase)
          ) {
            recentPhrasesRef.current.push(trimmedPhrase);

            setTranscript((prev) => {
              const newText = prev ? `${prev} ${trimmedPhrase}` : trimmedPhrase;
              return newText;
            });

            lastFinalTextRef.current = trimmedPhrase;
          }
        }

        silenceTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
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
      console.log("Speech recognition ended");
      setIsListening(false);
      clearAllTimeouts();
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      clearAllTimeouts();
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (abortError) {
          if (abortError instanceof Error && abortError.name !== "AbortError") {
            console.debug("Cleanup abort error:", abortError.message);
          }
        }
      }
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.warn("Speech recognition not available");
      return;
    }

    clearAllTimeouts();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (abortError) {
        console.debug("Abort before start error:", abortError);
      }
    }

    setTranscript("");
    lastFinalTextRef.current = "";
    recentPhrasesRef.current = [];

    restartTimeoutRef.current = setTimeout(() => {
      if (recognitionRef.current) {
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
          }, 30000);
        } catch (startError) {
          console.error("Failed to start recognition:", startError);
          setIsListening(false);
        }
      }
    }, 100);
  }, [clearAllTimeouts, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (stopError) {
        console.error("Failed to stop recognition:", stopError);
      }
    }
    clearAllTimeouts();
    setIsListening(false);
  }, [clearAllTimeouts]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  };
}
