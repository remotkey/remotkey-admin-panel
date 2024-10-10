import { BOX_SHADOWS } from "./src/common/theme/boxShadow";
import { BORDER_RADIUS } from "./src/common/theme/borderRadius";
import { COLOR_PALETTE } from "./src/common/theme/colors";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "350px",
      sm: "640px",
      md: "768px", // tablet
      lg: "1024px",
      xl: "1280px", // laptop
      "2xl": "1440px",
      "3xl": "1920px",
      "4xl": "2500px",
    },
    backgroundImage: {
      "custom-gradient":
        'linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url("/path-to-image")',
    },
    extend: {
      colors: COLOR_PALETTE,
      borderRadius: BORDER_RADIUS,
      boxShadow: BOX_SHADOWS,
    },
  },
} satisfies Config;

export default config;
