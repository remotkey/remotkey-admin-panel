import { Schema } from "mongoose";

export const HouseRulesSchema = new Schema({
  value: {
    type: String,
    required: [true, "House rule is required."],
  },
});
