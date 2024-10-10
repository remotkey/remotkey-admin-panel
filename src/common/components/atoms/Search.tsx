"use client";

import { SearchFiltersParams } from "@/common/enums";
import { COLOR_PALETTE } from "@/common/theme/colors";
import { useSearchAndFilters } from "@/custom-hooks/useSearchAndFilters";
import { CgSearch } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

const Search = () => {
  const { handleSearch } = useSearchAndFilters(SearchFiltersParams.SEARCH);
  return (
    <div className="relative flex items-center">
      <CgSearch
        size={20}
        color={COLOR_PALETTE?.C_309B5F}
        className="absolute left-4 mt-0.5"
      />
      <input
        className={twMerge(
          `font_med_8 rounded-r_08125 !pl-11 border border-C_DEDEDE px-[1rem] py-[0.88rem] placeholder-C_938F96 focus:outline-none w-80 md:w-96`
        )}
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
