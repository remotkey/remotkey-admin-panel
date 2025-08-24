import { FormValues } from "../components/PropertyForm";

interface PropertyFormField {
  name: keyof FormValues;
  label: string;
  isMandatory?: boolean;
  type?: "textarea" | "text" | "cityInput";
  placeholder?: string;
}

interface ExtraInfoInterface {
  name: string;
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
    placeholder: "Type here...",
    type: "cityInput",
    isMandatory: true,
  },
];

export const LOCATION_EXTRA_INFO: ExtraInfoInterface[] = [
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter Description",
  },
  {
    name: "website",
    label: "Website",
    placeholder: "Enter website here",
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    placeholder: "Enter contact number here",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email here",
  },
];

export const AM_PM_DATA = [
  { _id: "1", name: "PM" },
  { _id: "2", name: "AM" },
];

export const VENDOR_SELECTOR_LABELS = {
  LABEL: "Vendors",
  SEARCH_PLACEHOLDER: "Search vendors by name or city...",
  SELECTED_VENDORS: "Selected Vendors:",
  LOADING: "Loading vendors...",
  NO_VENDORS_CITY: "No vendors found in",
  NO_VENDORS_AVAILABLE: "No vendors available",
  CITIES_LABEL: "Cities:",
  ADD_BUTTON: "Add",
  REMOVE_BUTTON: "Remove",
  HELP_TEXT_CITY: "Vendors are filtered by city:",
  HELP_TEXT_NO_CITY: "Select a city to see available vendors",
} as const;

export const VENDOR_SELECTOR_STYLES = {
  SEARCH_INPUT:
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none",
  SELECTED_VENDOR_TAG:
    "flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800",
  REMOVE_BUTTON:
    "ml-1 rounded-full bg-blue-200 p-1 text-blue-600 hover:bg-blue-300",
  VENDOR_LIST_CONTAINER:
    "max-h-60 overflow-y-auto rounded-lg border border-gray-200",
  VENDOR_ITEM: "flex items-center justify-between p-3 hover:bg-gray-50",
  VENDOR_ITEM_SELECTED:
    "flex items-center justify-between p-3 hover:bg-gray-50 bg-blue-50",
  VENDOR_NAME: "font-medium text-gray-900",
  VENDOR_CITIES: "text-sm text-gray-600",
  VENDOR_DESCRIPTION: "text-sm text-gray-500 mt-1",
  ADD_BUTTON_STYLE:
    "px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600",
  REMOVE_BUTTON_STYLE:
    "px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600",
  HELP_TEXT: "text-sm text-gray-600",
} as const;
