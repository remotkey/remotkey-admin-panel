import * as v from "valibot";

export const NearByRestaurantsSchema = v.object({
  place: v.pipe(
    v.string(),
    v.nonEmpty("Nearby restaurant place cannot be empty.")
  ),
  lat: v.number("Invalid latitude."),
  lng: v.number("Invalid longitude."),
});
