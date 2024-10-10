import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface TokenData {
  id: string;
  username: string;
  email: string;
}

export const getDataFromToken = (request: NextRequest): string | undefined => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as TokenData;

    return decodedToken.id;
  } catch (err) {
    console.log("Error decoding token:", err);
  }
};
