import { FooterContactUsIconType, FooterSocialIconsType } from "../interfaces";

export const DEFAULT_IMAGE_SRC = "/images/default-image.avif";
export const IMAGE_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMKemuBwAEiwHkPRnNpgAAAABJRU5ErkJggg==";
export const MAIN_WEBSITE_URL = "https://remotkey.com";
export const WEBSITE_URL = "";

export const AMENITY_DATA = [
  {
    icon: "/icons/bathroom.svg",
    alt: "bathroomIcon",
    text: "Bathroom type: private",
  },
  {
    icon: "/icons/bathroom.svg",
    alt: "bathroomIcon",
    text: "2 bathrooms",
  },
];

export const FOOTER_CONTACT_DATA: FooterContactUsIconType[] = [
  {
    icon: "/icons/phone.svg",
    alt: "phoneIcon",
    text: "970-445-2014",
    href: "tel:970-445-2014",
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
  "Restaurant near me",
  "Ski Rentals and Outdoor Equipment Rentals near me",
  "Local tours near me",
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
