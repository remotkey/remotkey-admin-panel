import { FormValues } from "../components/PropertyForm";

interface PropertyFormField {
  name: keyof FormValues;
  label: string;
  isMandatory?: boolean;
  type?: "textarea" | "text";
  placeholder?: string;
}
export const PROPERTY_FORM_FIELDS: PropertyFormField[] = [
  {
    name: "name",
    label: "Property Title",
    placeholder: "Enter Property Title",
    isMandatory: true,
  },
  {
    name: "bookingPageLink",
    label: "Booking Page link",
    placeholder: "Enter booking page link here...",
    isMandatory: true,
  },
  {
    name: "thankYouText",
    label: "Thank you Text",
    placeholder: "Type here...",
    type: "textarea",
    isMandatory: false,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter City Name",
    isMandatory: true,
  },
];

export const AM_PM_DATA = [
  { _id: "1", name: "PM" },
  { _id: "2", name: "AM" },
];
