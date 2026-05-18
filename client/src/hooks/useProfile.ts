import { useState, useEffect, useRef } from "react";
import type { ProfileData } from "../types";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3001";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile`, {
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();

        if (!abortController.signal.aborted) {
          setProfile(data.data);
          setError(null);
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        if (!abortController.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      abortController.abort();
    };
  }, []);

  return { profile, isLoading, error };
}
