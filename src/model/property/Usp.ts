import { Schema } from "mongoose";

export const UspSchema = new Schema({
  value: {
    type: String,
    required: [true, "Unique selling point is required."],
  },
});
