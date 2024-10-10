import { SearchFiltersParams } from "@/common/enums";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const useSearchAndFilters = (param: SearchFiltersParams) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(SearchFiltersParams.PAGE, "1");

    if (query) {
      params.set(param, query);
    } else {
      params.delete(param);
    }

    replace(`?${params.toString()}`);
  }, 300);

  return { handleSearch };
};
