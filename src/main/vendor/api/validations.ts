import * as v from "valibot";

export const VendorSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Vendor name is required")),
  cities: v.pipe(
    v.array(
      v.pipe(
        v.string(),
        v.nonEmpty("City is required"),
        v.regex(/^[A-Za-z\s]+$/, "City name must contain only letters")
      )
    ),
    v.nonEmpty("Please select at least one city")
  ),
  description: v.optional(v.string()),
  website: v.optional(
    v.union([
      v.literal(""),
      v.pipe(v.string(), v.url("Please enter a valid website URL")),
    ])
  ),
  contactNumber: v.optional(
    v.union([
      v.literal(""),
      v.pipe(
        v.string(),
        v.regex(
          /^(\+1\s?)?(\(?[2-9][0-9]{2}\)?)[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/,
          "Please enter a valid US phone number"
        )
      ),
    ])
  ),
  email: v.optional(
    v.union([
      v.literal(""),
      v.pipe(v.string(), v.email("Please enter a valid email")),
    ])
  ),
});
