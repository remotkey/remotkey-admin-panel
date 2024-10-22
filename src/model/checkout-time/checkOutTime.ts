import { model, models, Schema } from "mongoose";
import { CheckOutTimeSchema } from "../property/CheckOutTime";
import { TimePeriod } from "@/main/property/interfaces";
import PropertyModel from "../property/Property";

export interface CheckOutTimeInterface {
  propertyId: typeof PropertyModel.prototype._id;
  checkOut: TimePeriod[];
  createdAt?: Date;
}

const CheckOutTimeUpdatedSchema = new Schema<CheckOutTimeInterface>({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  checkOut: {
    type: [CheckOutTimeSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CheckOutTimeModel =
  models.propertyCheckOutTime ||
  model<CheckOutTimeInterface>(
    "propertyCheckOutTime",
    CheckOutTimeUpdatedSchema
  );
export default CheckOutTimeModel;
