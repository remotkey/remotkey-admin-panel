import { Schema, model, models } from "mongoose";
import { VendorInterface } from "@/main/property/interfaces";

const VendorSchema = new Schema<VendorInterface>({
  name: { type: String, required: [true, "Vendor name is required"] },
  cities: {
    type: [
      {
        name: { type: String, required: true },
        vendorLocation: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
        },
      },
    ],
    required: [true, "At least one city is required"],
    validate: {
      validator: function (cities: any[]) {
        return (
          cities &&
          cities.length > 0 &&
          cities.every(
            (city) =>
              city.name &&
              city.vendorLocation &&
              typeof city.vendorLocation.lat === "number" &&
              typeof city.vendorLocation.lng === "number"
          )
        );
      },
      message: "Each city must have a name and vendor location coordinates",
    },
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
