import { IdNameProps } from "@/common/interfaces";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { FormValues } from "./PropertyForm";

const AM_PM_DATA = [
  { _id: "1", name: "PM" },
  { _id: "2", name: "AM" },
];

export const TimeDropdown = ({
  className,
  placeholder,
  name,
}: {
  className?: string;
  placeholder?: string;
  name: "checkIn.period" | "checkOut.period";
}) => {
  const { setValue } = useFormContext<FormValues>();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<IdNameProps | null>(
    AM_PM_DATA[0]
  );

  useEffect(() => {
    setValue(name, selectedPeriod?.name || "");
  }, [selectedPeriod, setValue, name]);

  return (
    <div className={`relative ${className}`}>
      <Listbox value={selectedPeriod} onChange={setSelectedPeriod}>
        <div className="relative">
          <ListboxButton
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={twMerge(
              "font_med_8 mt-8 flex w-full cursor-pointer items-center justify-between gap-[0.62rem] rounded-r_08125 border border-C_DEDEDE px-4 py-[0.88rem] text-C_938F96 hover:shadow-none",
              (isFocused || isOpen) && "border-C_309B5F"
            )}
            onClick={() => setIsOpen(!isOpen)}>
            <span>{selectedPeriod?.name || placeholder}</span>
            <FaChevronDown
              className={`text-C_309B5F transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-r_08125 border border-C_DEDEDE bg-white py-1 focus:outline-none sm:text-sm">
            {AM_PM_DATA.map((el) => (
              <ListboxOption
                key={el._id}
                value={el}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-slate-500 hover:text-white"
                onClick={() => {
                  setSelectedPeriod(el);
                  setIsOpen(false);
                }}>
                <span>{el.name}</span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};
