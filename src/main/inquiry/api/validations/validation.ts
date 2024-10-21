import * as v from "valibot";

export const InquirySchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter your name.")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Please enter a valid email address.")
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your phone."),
    v.regex(/^[0-9]{10}$/, "Phone number must be 10 digits.")
  ),
  interestedArea: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your interested area.")
  ),
});
