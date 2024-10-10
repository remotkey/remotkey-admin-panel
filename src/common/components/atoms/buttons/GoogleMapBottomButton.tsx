import React from "react";

interface GoogleMapBottomButtonInterface {
  text: string;
  onClick: () => void;
  className?: string;
}

export const GoogleMapBottomButton = ({
  text,
  onClick,
  className,
}: GoogleMapBottomButtonInterface) => {
  return (
    <button
      type="button"
      className={`mt-4 whitespace-nowrap rounded bg-C_5EBE76 px-4 py-2 text-white ${className}`}
      onClick={onClick}>
      {text}
    </button>
  );
};
