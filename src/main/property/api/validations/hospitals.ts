import * as v from "valibot";

export const HospitalSchema = v.object({
  place: v.pipe(v.string(), v.nonEmpty("Hospital name cannot be empty.")),
  lat: v.number("Invalid latitude."),
  lng: v.number("Invalid longitude."),
  description: v.optional(v.string()),
  website: v.optional(v.string()),
  contactNumber: v.optional(v.string()),
  email: v.optional(v.string()),
});
