import * as v from "valibot";

export const SignUpSchema = v.object({
  username: v.pipe(v.string(), v.nonEmpty("Please enter your username.")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Invalid email format.")
  ),

  password: v.pipe(v.string(), v.nonEmpty("Please enter password.")),
});

export type SignUpInterface = v.InferOutput<typeof SignUpSchema>;
