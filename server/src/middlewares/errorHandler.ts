import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", err.stack || err);

  if (err.status === 401) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  if (err.status === 429) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }
  if (err.code === "ENOTFOUND") {
    return res.status(503).json({ error: "Network error. Check connection" });
  }

  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Something went wrong",
  });
};
