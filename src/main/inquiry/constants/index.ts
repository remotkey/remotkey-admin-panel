import { InquiryInterface } from "@/model/inquiry/Inquiry";

export interface InquiryFormField {
  name: keyof InquiryInterface;
  label: string;
  isMandatory?: boolean;
  type?: "text";
  placeholder?: string;
}
export const INQUIRY_FORM_FIELDS: InquiryFormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    isMandatory: true,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone number",
    isMandatory: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    isMandatory: true,
  },
  {
    name: "interestedArea",
    label: "Area of interest",
    placeholder: "Enter your interested area name",
    isMandatory: true,
  },
];
