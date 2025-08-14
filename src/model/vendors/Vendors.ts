import { VendorInterface } from "@/main/property/interfaces";
import { Schema, model, models } from "mongoose";

const VendorSchema = new Schema<VendorInterface>({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Vendor name is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  lat: {
    type: Number,
    required: [true, "Vendor latitude is required."],
  },
  lng: {
    type: Number,
    required: [true, "Vendor longitude is required."],
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
