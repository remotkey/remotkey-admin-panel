"use server";

import { parse } from "valibot";
import { SignUpInterface, SignUpSchema } from "./validations";
import { postFetcher } from "@/common/fetchers";

export const handleSignup = async (data: SignUpInterface) => {
  parse(SignUpSchema, data);
  const signUpUser = await postFetcher("/signup", data);
  return signUpUser;
};
