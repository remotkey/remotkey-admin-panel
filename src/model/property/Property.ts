import { PropertyInterface } from "@/main/property/interfaces";
import { model, models, Schema } from "mongoose";
import { CheckInTimeSchema } from "./CheckInTime";
import { CheckOutTimeSchema } from "./CheckOutTime";
import { HospitalSchema } from "./Hospitals";
import { HouseRulesSchema } from "./HouseRules";
import { NearByRestaurantsSchema } from "./NearByRestaurants";
import { UspSchema } from "./Usp";
import { NearByRentals } from "./NearByRentals";
import { LocalTours } from "./LocalTours";

const PropertySchema = new Schema<PropertyInterface>({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Name is required."],
    minlength: [1, "Name must be at least 1 character long."],
  },
  slug: {
    type: String,
    required: [true, "Slug is required."],
    unique: true,
  },
  thumbnail: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  location: {
    type: String,
    required: [true, "Location is required."],
  },
  hospitals: {
    type: [HospitalSchema],
    required: [true, "Hospitals are required."],
  },
  qrCode: {
    type: String,
  },
  bookingPageLink: {
    type: String,
    required: [true, "Booking page link is required."],
  },
  thankYouText: {
    type: String,
  },
  usp: {
    type: [UspSchema],
  },
  checkIn: {
    type: CheckInTimeSchema,
    required: [true, "Check-in time is required."],
  },
  checkOut: {
    type: CheckOutTimeSchema,
    required: [true, "Check-out time is required."],
  },
  houseRules: {
    type: [HouseRulesSchema],
    required: [true, "House rules are required."],
  },
  nearByRestaurants: {
    type: [NearByRestaurantsSchema],
    required: [true, "Nearby restaurants are required."],
  },
  nearByRentals: {
    type: [NearByRentals],
    required: [true, "Nearby rentals are required."],
  },
  localTours: {
    type: [LocalTours],
    required: [true, "Nearby local tours are required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PropertyModel =
  models.Property || model<PropertyInterface>("Property", PropertySchema);
export default PropertyModel;
