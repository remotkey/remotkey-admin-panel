import { Schema } from "mongoose";

export const HospitalSchema = new Schema({
  place: {
    type: String,
    required: [true, "Hospital place is required."],
  },
  lat: {
    type: Number,
    required: [true, "Hospital latitude is required."],
  },
  lng: {
    type: Number,
    required: [true, "Hospital longitude is required."],
  },
});
