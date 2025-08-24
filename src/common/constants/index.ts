import { FooterContactUsIconType, FooterSocialIconsType } from "../interfaces";

export const DEFAULT_IMAGE_SRC = "/images/default-image.avif";
export const IMAGE_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMKemuBwAEiwHkPRnNpgAAAABJRU5ErkJggg==";
export const MAIN_WEBSITE_URL = "https://remotkey.com";
export const WEBSITE_URL = "";

export const FOOTER_CONTACT_DATA: FooterContactUsIconType[] = [
  {
    icon: "/icons/phone.svg",
    alt: "phoneIcon",
    text: "970-445-2015",
    href: "tel:970-445-2015",
  },
  {
    icon: "/icons/mail.svg",
    alt: "mailIcon",
    text: "info@remotkey.com",
    href: "mailto:info@remotkey.com",
  },
  {
    icon: "/icons/location.svg",
    alt: "locationIcon",
    text: "3971 Big Horn Rd 7CC Vail, CO 81657",
    href: "https://www.google.com/maps?ll=39.641016,-106.303277&z=19&t=m&hl=en&gl=IN&mapclient=embed&cid=4762095201643493810",
    isNewTab: true,
  },
];

export const TAB_MENU_DATA = [
  "Our favorite restaurants",
  "Our favorite gear rental shops",
  "Our favorite local tours and guides",
  "Our trusted vendors",
];

export const FOOTER_SOCIAL_ICONS: FooterSocialIconsType[] = [
  {
    src: "/icons/facebook.svg",
    alt: "FacebookIcon",
    href: "https://www.facebook.com/remotkey",
  },
  {
    src: "/icons/instagram.svg",
    alt: "InstgramIcon",
    href: "",
  },
];

export const SORT_BY_DATA = [
  {
    _id: "1",
    name: "Newest",
  },
  {
    _id: "2",
    name: "Oldest",
  },
];

// Dashboard Constants
export const DASHBOARD_CARDS = [
  {
    id: "properties",
    title: "Total Properties",
    icon: "/icons/building.svg",
    link: "/property-management",
    description: "Manage your property portfolio",
  },
  {
    id: "vendors",
    title: "Total Vendors",
    icon: "/icons/building.svg",
    link: "/vendors",
    description: "Trusted service providers",
  },
  {
    id: "inquiries",
    title: "Total Inquiries",
    icon: "/icons/mail.svg",
    link: "/inquiries",
    description: "Customer interest tracking",
  },
  {
    id: "checkout-requests",
    title: "Late Checkout Requests",
    icon: "/icons/calender.svg",
    link: "/late-checkout-requests",
    description: "Pending checkout approvals",
  },
];

export const DASHBOARD_ACTIONS = [
  {
    id: "property-management",
    title: "Property Management",
    description: "Manage all your properties",
    icon: "/icons/building.svg",
    color: "dashboard-gradient-green",
    textColor: "text-C_002E2E",
    link: "/property-management",
  },
  {
    id: "add-property",
    title: "Add Property",
    description: "Create a new property listing",
    icon: "/icons/plusWhite.svg",
    color: "dashboard-gradient-teal",
    textColor: "text-C_002E2E",
    link: "/add-property",
  },
  {
    id: "add-vendor",
    title: "Add Vendor",
    description: "Add a new trusted vendor",
    icon: "/icons/plusWhite.svg",
    color: "dashboard-gradient-blue",
    textColor: "text-C_002E2E",
    link: "/add-vendor",
  },
  {
    id: "view-inquiries",
    title: "View Inquiries",
    description: "Check property inquiries",
    icon: "/icons/mail.svg",
    color: "dashboard-gradient-green",
    textColor: "text-C_002E2E",
    link: "/inquiries",
  },
  {
    id: "checkout-requests",
    title: "Checkout Requests",
    description: "Manage late checkout requests",
    icon: "/icons/calender.svg",
    color: "dashboard-gradient-red",
    textColor: "text-C_002E2E",
    link: "/late-checkout-requests",
  },
];

export const DASHBOARD_STYLES = {
  GRID_LAYOUT: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
  ACTION_GRID:
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3",
  QUICK_ACTIONS_TITLE: "text-lg font-semibold text-C_002E2E mb-3",
  SECTION_HEADER: "text-lg font-semibold text-C_002E2E mb-3",
};
