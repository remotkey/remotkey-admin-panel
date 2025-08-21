import { VendorInterface } from "@/main/property/interfaces";
import { Schema, model, models } from "mongoose";

const VendorSchema = new Schema<VendorInterface>({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Vendor name is required."],
  },
  cities: {
    type: [String],
    required: [true, "City is required."],
    set: (values: string[]) =>
      values?.map((v) => v.trim()).filter((v) => v.length > 0),
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VendorModel =
  models.Vendor || model<VendorInterface>("Vendor", VendorSchema);
export default VendorModel;
