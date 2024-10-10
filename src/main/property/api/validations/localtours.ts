import * as v from "valibot";

export const LocalTours = v.object({
  place: v.pipe(
    v.string(),
    v.nonEmpty("Nearby local tour place cannot be empty.")
  ),
  lat: v.number("Invalid latitude."),
  lng: v.number("Invalid longitude."),
});
