import * as v from "valibot";

export const NearByRentals = v.object({
  place: v.pipe(v.string(), v.nonEmpty("Nearby rental place cannot be empty.")),
  lat: v.number("Invalid latitude."),
  lng: v.number("Invalid longitude."),
});
