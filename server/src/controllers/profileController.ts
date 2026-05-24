import { Request, Response } from "express";
import { profileData } from "../data/profile.js";

export const getProfile = async (_req: Request, res: Response) => {
  try {
    return res.json({
      success: true,
      data: profileData,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Profile fetch error:", errorMessage);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch profile data",
    });
  }
};
