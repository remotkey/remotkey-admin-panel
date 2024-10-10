import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return NextResponse.json({
    meta: {
      code: 1,
      message: "Logged out successfully",
    },
  });
}
