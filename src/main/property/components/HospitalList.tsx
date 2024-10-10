import React, { useEffect, useState } from "react";
import { HiTrash, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { LatLng } from "../interfaces";

interface HospitalListProps {
  hospitals: LatLng[];
  handleRemoveHospital: (index: number) => void;
}

export const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  handleRemoveHospital,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (hospitals.length > 0) {
      setIsOpen(true);
    }
  }, [hospitals]);

  const toggleHospitalList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-6 rounded-lg border border-C_F7F7F7 bg-gray-100">
      <h3
        className="flex cursor-pointer items-center justify-between rounded-lg bg-C_F7F7F7 px-4 py-3 transition-colors"
        onClick={toggleHospitalList}>
        <span className="text-base font-medium">Nearby Hospitals</span>
        <span className="text-gray-600">
          {isOpen ? <HiChevronUp /> : <HiChevronDown />}
        </span>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}>
        <ul className="space-y-2 rounded-b-lg bg-white px-4 py-3">
          {hospitals.map((hospital, index) => (
            <li
              key={index}
              className="flex items-center justify-between text-gray-800">
              <span>{hospital.place}</span>
              <button
                type="button"
                className="flex items-center text-red-500 transition-colors hover:text-red-600 hover:shadow-none"
                onClick={() => handleRemoveHospital(index)}>
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
