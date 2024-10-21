import * as v from "valibot";

export const InquirySchema = v.object({
  fullName: v.pipe(v.string(), v.nonEmpty("Please enter your full name.")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Please enter a valid email address.")
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your phone."),
    v.regex(
      /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/,
      "Phone number must be 10 digits and valid."
    )
  ),
  interestedArea: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your interested area.")
  ),
});
