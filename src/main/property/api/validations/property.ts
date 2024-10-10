import * as v from "valibot";
import { HospitalSchema } from "./hospitals";
import { UspSchema } from "./usps";
import { houseRuleSchema } from "./houseRules";
import { NearByRestaurantsSchema } from "./nearbyrestaurants";
import { NearByRentals } from "./nearbyrentals";
import { LocalTours } from "./localtours";

export const PropertySchema = v.object({
  id: v.optional(v.string()),
  name: v.pipe(v.string(), v.nonEmpty("Please enter property name.")),
  slug: v.optional(v.string()),
  // thumbnail: v.pipe(v.string(), v.nsonEmpty("Please Select Thumbnail")),
  city: v.pipe(v.string(), v.nonEmpty("Please enter city name.")),
  location: v.pipe(v.string(), v.nonEmpty("Please enter location name.")),
  qrCode: v.optional(v.string()),
  bookingPageLink: v.pipe(
    v.string(),
    v.nonEmpty("Please enter booking page link.")
  ),
  hospitals: v.pipe(
    v.array(HospitalSchema),
    v.nonEmpty("Nearby Hospitals cannot be empty.")
  ),
  nearByRestaurants: v.pipe(
    v.array(NearByRestaurantsSchema),
    v.nonEmpty("Nearby Restaurants cannot be empty.")
  ),
  nearByRentals: v.pipe(
    v.array(NearByRentals),
    v.nonEmpty("Nearby Rentals cannot be empty.")
  ),
  localTours: v.pipe(
    v.array(LocalTours),
    v.nonEmpty("Nearby Local Tours cannot be empty.")
  ),
  thankYouText: v.optional(v.string()),
  usp: v.pipe(v.array(UspSchema), v.nonEmpty("Please enter atleast one USP.")),
  checkIn: v.object({
    time: v.pipe(v.string(), v.nonEmpty("Please enter check in time.")),
    period: v.pipe(v.string(), v.nonEmpty("Please enter check in period.")),
  }),
  checkOut: v.object({
    time: v.pipe(v.string(), v.nonEmpty("Please enter check out time.")),
    period: v.pipe(v.string(), v.nonEmpty("Please enter check out period.")),
  }),
  houseRules: v.pipe(
    v.array(houseRuleSchema),
    v.nonEmpty("House Rules cannot be empty.")
  ),
  createdAt: v.optional(v.date()),
});

export type PropertyInterface = v.InferOutput<typeof PropertySchema>;
