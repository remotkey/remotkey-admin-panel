import * as v from "valibot";

export const HospitalSchema = v.object({
  place: v.pipe(v.string(), v.nonEmpty("Hospital name cannot be empty.")),
  lat: v.number("Invalid latitude."),
  lng: v.number("Invalid longitude."),
});
