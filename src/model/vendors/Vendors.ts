import { Schema, model, models } from "mongoose";
import { VendorInterface } from "@/main/property/interfaces";

const VendorSchema = new Schema<VendorInterface>({
  name: { type: String, required: [true, "Vendor name is required"] },
  cities: {
    type: [String],
    required: [true, "At least one city is required"],
    set: (values: string[]) =>
      values?.map((v) => v.trim()).filter((v) => v.length > 0),
  },
  description: String,
  website: String,
  contactNumber: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const VendorModel =
  models.Vendor || model<VendorInterface>("Vendor", VendorSchema);

export default VendorModel;
