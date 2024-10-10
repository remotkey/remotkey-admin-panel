import React from "react";
import { ShimmerInputContainer } from "./ShimmerInputContainer";

export const ShimmerMapLoader = () => {
  return (
    <div className="animate-pulse space-y-2">
      <ShimmerInputContainer />
      <div className="h-[25rem] w-full rounded-r_08125 border bg-gray-200"></div>{" "}
    </div>
  );
};
