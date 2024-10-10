import { LatLng } from "@/main/property/interfaces";
import { useState, useEffect } from "react";
import { HiChevronUp, HiChevronDown, HiTrash } from "react-icons/hi";

interface ListInterface {
  fileds: LatLng[];
  handleRemoveItem: (index: number) => void;
  text: string;
}

export const AccordionList = ({
  fileds,
  handleRemoveItem,
  text,
}: ListInterface) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (fileds.length > 0) {
      setIsOpen(true);
    }
  }, [fileds]);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-6 rounded-lg border border-C_F7F7F7 bg-gray-100">
      <h3
        className="flex cursor-pointer items-center justify-between rounded-lg bg-C_F7F7F7 px-4 py-3 transition-colors"
        onClick={toggleList}>
        <span className="text-base font-medium">{text}</span>
        <span className="text-gray-600">
          {isOpen ? <HiChevronUp /> : <HiChevronDown />}
        </span>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}>
        <ul className="space-y-2 rounded-b-lg bg-white px-4 py-3">
          {fileds.map((filed, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-gray-800">
              <span>{filed.place}</span>
              <button
                type="button"
                className="flex items-center text-red-500 transition-colors hover:text-red-600 hover:shadow-none"
                onClick={() => handleRemoveItem(index)}>
                <HiTrash className="mr-1" />
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
