"use client";

import { COLOR_PALETTE } from "@/common/theme/colors";
import { AppProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

export const ProgressBar = () => {
  return (
    <Suspense>
      <AppProgressBar
        height="2px"
        color={COLOR_PALETTE.C_5EBE76}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Suspense>
  );
};
