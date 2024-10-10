import { Schema } from "mongoose";

export const NearByRentals = new Schema({
  place: {
    type: String,
    required: [true, "Near by rental place is required."],
  },
  lat: {
    type: Number,
    required: [true, "Near by rental latitude is required."],
  },
  lng: {
    type: Number,
    required: [true, "Near by rental longitude is required."],
  },
});
