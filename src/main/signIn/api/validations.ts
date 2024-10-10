import * as v from "valibot";

export const SignInSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Invalid email format.")
  ),

  password: v.pipe(v.string(), v.nonEmpty("Please enter password.")),
});

export type SignInInterface = v.InferOutput<typeof SignInSchema>;
