import { model, models, Schema } from "mongoose";

export interface InquiryInterface {
  name: string;
  email: string;
  phone: string;
  interestedArea: string;
}

const InquirySchema = new Schema<InquiryInterface>({
  name: {
    type: String,
    required: [true, "Name is required"],
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
});

const InquiryModel =
  models.inquiry || model<InquiryInterface>("inquiry", InquirySchema);
export default InquiryModel;
