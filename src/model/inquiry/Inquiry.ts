import { model, models, Schema } from "mongoose";

export interface InquiryInterface {
  fullName: string;
  email: string;
  phone: string;
  interestedArea: string;
  createdAt: Date;
}

const InquirySchema = new Schema<InquiryInterface>({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  interestedArea: {
    type: String,
    required: [true, "Interested Area is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InquiryModel =
  models.inquiry || model<InquiryInterface>("inquiry", InquirySchema);
export default InquiryModel;
