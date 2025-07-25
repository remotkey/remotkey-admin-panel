import { Schema } from "mongoose";

export const Location = new Schema({
  place: {
    type: String,
    required: [true, "Please Enter Location."],
  },
  lat: {
    type: Number,
    required: [true, "Latitude is required."],
  },
  lng: {
    type: Number,
    required: [true, "Longitude is required."],
  },
});
