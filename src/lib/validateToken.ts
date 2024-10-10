"use server";

import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.TOKEN_SECRET);

export const validateToken = async (token: string) => {
  if (!token) {
    return false;
  }

  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("expired")) {
        console.error("Token has expired");
      } else {
        console.error("Invalid token:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};
