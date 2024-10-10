import { Schema } from "mongoose";

export const LocalTours = new Schema({
  place: {
    type: String,
    required: [true, "Near by local tour place is required."],
  },
  lat: {
    type: Number,
    required: [true, "Near by local tour latitude is required."],
  },
  lng: {
    type: Number,
    required: [true, "Near by local tour longitude is required."],
  },
});
