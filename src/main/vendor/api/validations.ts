import * as v from "valibot";

export const VendorSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Vendor Name cannot be empty.")),
  city: v.pipe(v.string(), v.nonEmpty("Please enter city name.")),
  lat: v.number("Invalid latitude."),
  lng: v.number("Invalid longitude."),
  description: v.optional(v.string()),
  website: v.optional(v.string()),
  contactNumber: v.optional(v.string()),
  email: v.optional(v.string()),
});
