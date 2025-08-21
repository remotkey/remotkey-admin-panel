import { VendorInterface } from "@/main/property/interfaces";

interface VendorFormFields {
  name: keyof VendorInterface;
  label: string;
  isMandatory?: boolean;
  type?: "textarea" | "text";
  placeholder?: string;
}

export const VENDOR_FORM_FIELDS: VendorFormFields[] = [
  {
    name: "name",
    label: "Vendor Name",
    placeholder: "e.g., Vail Realty Group",
    isMandatory: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "e.g., A trusted agency specializing in beachfront properties",
    type: "textarea",
    isMandatory: false,
  },
  {
    name: "website",
    label: "Website",
    placeholder: "e.g., https://www.vailrealtygroup.com",
    isMandatory: false,
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    placeholder: "e.g., (305) 555-1234 or +1 305-555-1234",
    isMandatory: false,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "e.g., info@vailrealtygroup.com",
    isMandatory: false,
  },
];
