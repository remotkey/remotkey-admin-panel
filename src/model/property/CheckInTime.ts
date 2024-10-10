import { Schema } from "mongoose";

export const CheckInTimeSchema = new Schema({
  time: {
    type: String,
    required: [true, "Check-in time is required."],
  },
  period: {
    type: String,
    required: [true, "Check-in period is required."],
  },
});
