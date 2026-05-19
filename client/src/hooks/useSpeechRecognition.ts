import { useState, useEffect, useCallback, useRef } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    recognition.interimResults = false;
    recognition.lang = "ru-RU";
    recognition.maxAlternatives = 1;

    let accumulatedText = "";

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
      accumulatedText = "";
    };

    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const text = lastResult[0].transcript;

      if (lastResult.isFinal && text) {
        accumulatedText = text;
        setTranscript(text);

        setTimeout(() => {
          if (recognitionRef.current) {
            try {
              recognitionRef.current.stop();
            } catch (e) {}
          }
        }, 500);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
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
    } catch (e) {}

    setTranscript("");
    setIsListening(true);

    try {
      recognitionRef.current.start();

      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          try {
            recognitionRef.current.stop();
          } catch (e) {}
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
