"use server";

import { postFetcher } from "@/common/fetchers";
import { SignInInterface, SignInSchema } from "@/main/signIn/api/validations";
import { cookies } from "next/headers";
import { parse } from "valibot";

export const handleSignIn = async (signInData: SignInInterface) => {
  parse(SignInSchema, signInData);
  const { data, message, code, token } = await postFetcher(
    "/signin",
    signInData
  );
  if (code === 1 && token) {
    cookies().set("token", token, {
      secure: true,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  const signInUser = { data, message, code };
  return signInUser;
};
