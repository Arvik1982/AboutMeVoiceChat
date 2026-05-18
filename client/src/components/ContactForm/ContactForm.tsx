import React, { useState } from "react";
import styles from "./ContactForm.module.css";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3001";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("Sending...");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setStatusMessage("Message sent successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setStatusMessage("Failed to send. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === "loading"}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === "loading"}
        />
      </div>
      <input
        name="email"
        type="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={status === "loading"}
      />
      <textarea
        name="message"
        placeholder="Message *"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        required
        disabled={status === "loading"}
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <div className={styles.success}>{statusMessage}</div>
      )}
      {status === "error" && (
        <div className={styles.error}>{statusMessage}</div>
      )}
    </form>
  );
};
