"use client";

import { SearchFiltersParams } from "@/common/enums";
import { IdNameProps } from "@/common/interfaces";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchAndFilters } from "@/custom-hooks/useSearchAndFilters";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const defaultValue = { _id: "", name: "" };

export const SelectDropdown = ({
  data,
  className,
  placeholder,
  minWidth,
  isCityFilter,
}: {
  data?: IdNameProps[];
  className?: string;
  placeholder?: string;
  minWidth?: string;
  isCityFilter?: boolean;
}) => {
  const { handleSearch } = useSearchAndFilters(
    isCityFilter ? SearchFiltersParams?.CITY : SearchFiltersParams?.SORT_TYPE
  );

  const [selected, setSelected] = useState<IdNameProps>(defaultValue);
  const [multiSelected, setMultiSelected] = useState<IdNameProps[]>([]);
  const [open, setOpen] = useState(false);

  const handleOnChange = (el?: IdNameProps) => {
    if (!el) return;
    if (isCityFilter) {
      const alreadySelected = multiSelected?.find((c) => c?._id === el?._id);
      let updated;
      if (alreadySelected) {
        updated = multiSelected?.filter((c) => c?._id !== el?._id);
      } else {
        updated = [...(multiSelected ?? []), el];
      }
      setMultiSelected(updated ?? []);
      handleSearch?.(updated?.map((c) => c?.name)?.join(",") ?? "");
    } else {
      setSelected(el ?? defaultValue);
      setOpen(false);
      handleSearch?.(el?.name ?? "");
    }
  };

  const handleClear = () => {
    if (isCityFilter) {
      setMultiSelected([]);
    } else {
      setSelected(defaultValue);
    }
    setOpen(false);
    handleSearch?.("");
  };

  const displayText = isCityFilter
    ? multiSelected?.length
      ? multiSelected?.map((c) => c?.name)?.join(", ")
      : placeholder
    : selected?.name || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          style={{ minWidth }}
          className={`font_med_8 flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-r_08125 border border-C_DEDEDE px-4 py-[0.88rem] text-C_938F96 hover:shadow-none focus:border-C_309B5F ${className}`}>
          <span className="truncate">{displayText}</span>
          <FaChevronDown
            className={`text-black transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white p-0 shadow-sm">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={handleClear}
              className="cursor-pointer py-2 pl-3 pr-9 text-red-500 hover:bg-red-50">
              Clear
            </CommandItem>
            {data?.map((el) => {
              const active = isCityFilter
                ? multiSelected?.some((c) => c?._id === el?._id)
                : selected?._id === el?._id;
              return (
                <CommandItem
                  key={el?._id}
                  onSelect={() => handleOnChange(el)}
                  className={`cursor-pointer py-2 pl-3 pr-9 hover:bg-blue-100 ${
                    active ? "bg-blue-50" : ""
                  }`}>
                  {el?.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
