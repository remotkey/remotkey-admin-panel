import { Schema } from "mongoose";

export const NearByRestaurantsSchema = new Schema({
  place: {
    type: String,
    required: [true, "Nearby restaurant place is required."],
  },
  lat: {
    type: Number,
    required: [true, "Nearby restaurant latitude is required."],
  },
  lng: {
    type: Number,
    required: [true, "Nearby restaurant longitude is required."],
  },
});
