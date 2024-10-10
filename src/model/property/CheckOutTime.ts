import { Schema } from "mongoose";

export const CheckOutTimeSchema = new Schema({
  time: {
    type: String,
    required: [true, "Check-out time is required."],
  },
  period: {
    type: String,
    required: [true, "Check-out period is required."],
  },
});
