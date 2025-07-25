import * as v from "valibot";

export const Location = v.object({
  place: v.pipe(v.string(), v.nonEmpty("Please enter location name.")),
  lat: v.pipe(
    v.number("Invalid latitude."),
    v.custom((value) => value !== 0, "Please enter valid location name")
  ),
  lng: v.pipe(
    v.number("Invalid longitude."),
    v.custom((value) => value !== 0, "Please enter valid location name")
  ),
});
