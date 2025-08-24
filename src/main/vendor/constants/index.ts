import { VendorInterface } from "@/main/property/interfaces";

// Form field configurations
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

// Table headers and labels
export const VENDOR_TABLE_HEADERS = {
  SR_NO: "Sr No",
  NAME: "Name",
  LINKED_WITH: "Linked with",
  CONTACT_INFO: "Contact Info",
  DESCRIPTION: "Description",
  ACTIONS: "Actions",
} as const;

// Status messages
export const VENDOR_STATUS_MESSAGES = {
  NO_VENDORS_FOUND: "No Vendors found",
  LOADING_VENDORS: "Loading vendors...",
  ERROR_LOADING_VENDORS: "Error loading vendors",
  VENDOR_CREATED_SUCCESS: "Vendor created successfully",
  VENDOR_UPDATED_SUCCESS: "Vendor updated successfully",
  VENDOR_DELETED_SUCCESS: "Vendor deleted successfully",
  ERROR_CREATING_VENDOR: "Error creating vendor",
  ERROR_UPDATING_VENDOR: "Error updating vendor",
  ERROR_DELETING_VENDOR: "Error deleting vendor",
} as const;

// Form labels and placeholders
export const VENDOR_FORM_LABELS = {
  VENDOR_NAME: "Vendor Name",
  DESCRIPTION: "Description",
  WEBSITE: "Website",
  CONTACT_NUMBER: "Contact Number",
  EMAIL: "Email",
  CITIES_AND_LOCATIONS: "Cities and Locations",
  TYPE_HERE: "Type here...",
  AUTO_LINK_LABEL: "Auto-link to properties in selected cities",
  AUTO_LINK_DESCRIPTION:
    "Automatically link this vendor to properties in the selected cities",
  CITIES: "Cities",
  SELECT_VENDOR_LOCATIONS: "Select Vendor Locations",
  SELECT_LOCATION_IN: "Select location in",
  LOCATION_SUMMARY: "Location Summary",
  SELECTED_LOCATION: "Selected Location",
  NO_LOCATION_SELECTED: "No location selected",
} as const;

// Button text
export const VENDOR_BUTTON_TEXT = {
  ADD_VENDOR: "+ Add Vendor",
  SAVE_VENDORS: "Save Vendors",
  REMOVE: "Remove",
  REMOVE_LOCATION: "Remove Location",
  CHANGE: "Change",
  SELECT: "Select",
} as const;

// Map and location related text
export const VENDOR_LOCATION_TEXT = {
  CLICK_MAP_OR_SEARCH:
    "Click on the map or use the search box to select your exact business location in",
  SEARCH_IN: "Search in",
  SEARCH_PLACEHOLDER: "Search for location in",
  SELECTED_COORDINATES: "Selected",
  LOCATION_ICON: "📍",
  LOCATION_SELECTED: "Location selected",
  LOCATION_NOT_SELECTED: "Location not selected",
} as const;

// Error messages
export const VENDOR_ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_WEBSITE: "Please enter a valid website URL",
  MIN_LENGTH: "Minimum length should be",
  MAX_LENGTH: "Maximum length should be",
  INVALID_COORDINATES: "Invalid coordinates",
  LOCATION_REQUIRED: "Location is required for this city",
} as const;

// Success messages
export const VENDOR_SUCCESS_MESSAGES = {
  LOCATION_SAVED: "Location saved successfully",
  CITY_ADDED: "City added successfully",
  CITY_REMOVED: "City removed successfully",
  FORM_SAVED: "Form saved successfully",
} as const;

// Validation messages
export const VENDOR_VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Vendor name is required",
  NAME_MIN_LENGTH: "Vendor name must be at least 2 characters",
  NAME_MAX_LENGTH: "Vendor name must be less than 100 characters",
  DESCRIPTION_MAX_LENGTH: "Description must be less than 500 characters",
  EMAIL_INVALID: "Please enter a valid email address",
  PHONE_INVALID: "Please enter a valid phone number",
  WEBSITE_INVALID: "Please enter a valid website URL",
  CITIES_REQUIRED: "At least one city is required",
  LOCATION_REQUIRED: "Location is required for all cities",
} as const;

// Table styling classes
export const VENDOR_TABLE_STYLES = {
  HEADER_BASE:
    "font_med_8 border-y border-C_DEDEDE py-[0.94rem] pl-4 text-start text-C_6E6E6E",
  CELL_BASE: "px-4",
  ROW_BASE: "bg-C_F7F7F7",
  FIRST_CELL: "first:rounded-l-r_0625",
  LAST_CELL: "last:rounded-r_0625",
  NO_DATA_CELL: "pl-4 text-center first:rounded-r_0625",
} as const;

// Form styling classes
export const VENDOR_FORM_STYLES = {
  CONTAINER: "flex flex-col gap-10",
  FIELD_CONTAINER_WITH_DATA:
    "relative flex flex-col gap-5 rounded-lg border p-4",
  FIELD_CONTAINER: "flex flex-col gap-5",
  SUBMIT_BUTTON:
    "flex w-fit items-center justify-center gap-1 !rounded-lg px-6 py-2",
  SUBMIT_BUTTON_BORDER: "border border-C_5EBE76",
} as const;

// Location selector styles
export const VENDOR_LOCATION_STYLES = {
  CITY_BUTTON_ACTIVE: "bg-blue-500 text-white",
  CITY_BUTTON_INACTIVE: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  LOCATION_CONTAINER: "rounded-lg border bg-gray-50 p-4",
  LOCATION_SUMMARY:
    "flex items-center justify-between rounded border bg-white p-2",
  LOCATION_SELECTED: "text-xs text-green-600",
  LOCATION_NOT_SELECTED: "text-xs text-gray-500",
  ACTION_BUTTON: "text-xs text-blue-600 hover:text-blue-800",
} as const;

// Map configuration
export const VENDOR_MAP_CONFIG = {
  DEFAULT_ZOOM: 15,
  DEFAULT_CENTER: { lat: 39.7392, lng: -104.9903 }, // Denver
  SEARCH_BOX_WIDTH: "w-72",
  SEARCH_BOX_POSITION: "absolute left-4 top-4 z-10",
  MAP_HEIGHT: "400px",
} as const;

// API endpoints
export const VENDOR_API_ENDPOINTS = {
  CREATE: "/api/vendor",
  UPDATE: "/api/vendor",
  DELETE: "/api/vendor",
  GET_ALL: "/api/vendor",
  GET_BY_ID: "/api/vendor",
} as const;

// Navigation routes
export const VENDOR_ROUTES = {
  VENDORS_LIST: "/vendors",
  ADD_VENDOR: "/add-vendor",
  EDIT_VENDOR: "/edit-vendor",
} as const;

// Filter and search labels
export const VENDOR_FILTER_LABELS = {
  ALL_VENDORS: "All Vendors",
  SORT_BY: "Sort By",
  FILTER_BY_CITY: "Filter By City",
} as const;

// Filter and search styles
export const VENDOR_FILTER_STYLES = {
  CITY_DROPDOWN_CONTAINER: "w-44 whitespace-nowrap",
  CITY_DROPDOWN_MIN_WIDTH: "9.375rem",
} as const;

// City input labels
export const CITY_INPUT_LABELS = {
  LOADING: "Loading...",
  SEARCH_ADD_CITIES: "Search and add cities...",
  SEARCH_SELECT_CITY: "Search and select city...",
  REMOVE_CITY: "×",
} as const;

// City input styles
export const CITY_INPUT_STYLES = {
  LOADING: "animate-pulse rounded bg-gray-100 p-2",
  CONTAINER: "flex w-full gap-2",
  CONTAINER_WITH_VALUES: "flex w-full gap-2 flex-col",
  CITY_TAGS: "mb-2 flex flex-wrap gap-2",
  CITY_TAG:
    "flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition hover:bg-green-200",
  INPUT: "flex items-center gap-2.5 rounded-r_08125 border px-4 py-[0.88rem]",
  ERROR: "text-sm text-red-500",
} as const;

// City coordinates input labels
export const CITY_COORDINATES_LABELS = {
  LOADING: "Loading...",
  SEARCH_ADD_CITIES: "Search and add cities...",
  SEARCH_SELECT_CITY: "Search and select city...",
  REMOVE_CITY: "×",
  COORDINATES_FORMAT: "({lat}, {lng})",
} as const;

// City coordinates input styles
export const CITY_COORDINATES_STYLES = {
  LOADING: "animate-pulse rounded bg-gray-100 p-2",
  CONTAINER: "flex w-full gap-2",
  CONTAINER_WITH_VALUES: "flex w-full flex-col",
  CITY_TAGS: "mb-2 flex flex-wrap gap-2",
  CITY_TAG:
    "flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition hover:bg-green-200",
  INPUT: "flex items-center gap-2.5 rounded-r_08125 border px-4 py-[0.88rem]",
  ERROR: "text-sm text-red-500",
} as const;

// City autocomplete labels
export const CITY_AUTOCOMPLETE_LABELS = {
  LOADING: "Loading...",
  SEARCH_ADD_CITIES: "Search and add cities...",
  SEARCH_SELECT_CITY: "Search and select city...",
  REMOVE_CITY: "×",
} as const;

// City autocomplete input styles
export const CITY_AUTOCOMPLETE_STYLES = {
  LOADING: "animate-pulse rounded bg-gray-100 p-2",
  CONTAINER: "flex w-full gap-2",
  CONTAINER_WITH_VALUES: "flex w-full gap-2 flex-col",
  CITY_TAGS: "mb-2 flex flex-wrap gap-2",
  CITY_TAG:
    "flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition hover:bg-green-200",
  INPUT: "flex items-center gap-2.5 rounded-r_08125 border px-4 py-[0.88rem]",
  ERROR: "text-sm text-red-500",
} as const;

// City dropdown labels
export const CITY_DROPDOWN_LABELS = {
  FILTER_BY_CITY: "Filter By City",
} as const;

// City dropdown styles
export const CITY_DROPDOWN_STYLES = {
  CONTAINER: "w-44 whitespace-nowrap",
  MIN_WIDTH: "9.375rem",
} as const;

// Vendor tab display constants
export const VENDOR_TAB_LABELS = {
  TAB_TITLE: "Our trusted vendors",
  NO_VENDORS: "No vendor locations available for this property.",
  VENDORS_HEADING: "Our Trusted Vendors",
  LOCATION_ICON: "📍",
  PHONE_ICON: "📞",
  EMAIL_ICON: "✉️",
  WEBSITE_ICON: "🌐",
} as const;

// Vendor tab styles
export const VENDOR_TAB_STYLES = {
  VENDOR_CARD:
    "rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow",
  VENDOR_NAME: "font-semibold text-gray-900",
  VENDOR_DESCRIPTION: "mt-1 text-sm text-gray-600",
  CITY_ITEM: "flex items-center gap-2",
  CITY_NAME: "text-gray-700",
  COORDINATES: "text-xs text-gray-500",
  CONTACT_SECTION: "mt-3 pt-3 border-t border-gray-100 space-y-1 text-sm",
  CONTACT_ITEM: "flex items-center gap-2",
  CONTACT_LABEL: "text-gray-500",
  CONTACT_LINK: "text-blue-600 hover:underline",
  NO_VENDORS_CONTAINER: "rounded-lg bg-gray-50 p-6 text-center text-gray-600",
} as const;
