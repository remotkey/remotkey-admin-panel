import React from "react";

export const ShimmerInputContainer = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-6 w-24 rounded bg-gray-200"></div>{" "}
      {/* Shimmer for label */}
      <div className="h-[3.25rem] w-full rounded-r_08125 bg-gray-200"></div>{" "}
      {/* Shimmer for input */}
    </div>
  );
};
