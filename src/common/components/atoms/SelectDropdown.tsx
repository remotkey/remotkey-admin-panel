"use client";

import { SORT_BY_DATA } from "@/common/constants";
import { SearchFiltersParams } from "@/common/enums";
import { IdNameProps } from "@/common/interfaces";
import { useSearchAndFilters } from "@/custom-hooks/useSearchAndFilters";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const defaultValue = { _id: "", name: "" };

export const SelectDropdown = ({
  data,
  className,
  placeholder,
}: {
  data: IdNameProps[];
  className?: string;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleSearch } = useSearchAndFilters(SearchFiltersParams.SORT_TYPE);
  const [selected, setSelected] = useState<IdNameProps>(defaultValue);

  const handleOnChange = (el: IdNameProps) => {
    setSelected(el);
    setIsOpen(false);
    handleSearch(el.name);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className="font_med_8 flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-r_08125 border border-C_DEDEDE px-4 py-[0.88rem] text-C_938F96 hover:shadow-none focus:border-C_309B5F"
        onClick={() => setIsOpen(!isOpen)}>
        <span>{selected.name || placeholder}</span>
        <FaChevronDown
          className={`text-black transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul className="absolute mt-1 max-h-60 w-full overflow-auto rounded-r_08125 border border-C_DEDEDE bg-white py-1 focus:outline-none sm:text-sm">
          {SORT_BY_DATA.map((el) => (
            <li
              key={el._id}
              onClick={() => handleOnChange(el)}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-blue-100">
              {el.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
