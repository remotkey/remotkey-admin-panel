"use client";

import { SearchFiltersParams } from "@/common/enums";
import { COLOR_PALETTE } from "@/common/theme/colors";
import { useSearchAndFilters } from "@/custom-hooks/useSearchAndFilters";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MainBtn = ({
  currentPage,
  activePage,
  handleFn,
}: {
  currentPage: number;
  activePage: number;
  handleFn: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={handleFn}
      disabled={activePage === currentPage}
      className={`max-w-fit border px-2.5 py-1 text-xs md:px-3.5 md:py-1.5 md:text-sm ${activePage === currentPage ? "rounded-md border-C_309B5F font-bold text-C_309B5F" : "border-transparent font-semibold hover:rounded-md hover:border-C_309B5F hover:text-C_309B5F hover:shadow-none"}`}>
      {currentPage}
    </button>
  );
};
export const PaginationMore = () => {
  return (
    <>
      {Array(1)
        ?.fill("")
        ?.map((el, index) => (
          <span key={index} className="block px-3.5 py-1.5 font-semibold">
            ...
          </span>
        ))}
    </>
  );
};

export const Pagination = ({ totalItem }: { totalItem: number }) => {
  const searchParams = useSearchParams();
  const perPageLimit = searchParams?.get(SearchFiltersParams?.PER_PAGE) || 10;
  const totalPages = Math.ceil(totalItem / Number(perPageLimit) || 1);

  const currentPageFromSearchParams = searchParams?.get(
    SearchFiltersParams?.PAGE
  );
  const [activePage, setActivePage] = useState(
    Number(currentPageFromSearchParams) || 1
  );
  const { handleSearch } = useSearchAndFilters(SearchFiltersParams.PAGE);

  const hasPreviousPage =
    Number(searchParams?.get(SearchFiltersParams?.PAGE)) > 1 || false;
  const hasNextPage = activePage < totalPages;

  const handlePaginationButtons = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setActivePage(page);
    handleSearch(page.toString());
  };

  useEffect(() => {
    handlePaginationButtons(Number(currentPageFromSearchParams));
  }, [currentPageFromSearchParams]);

  return (
    <div className="flex items-center justify-end gap-2">
      <FaChevronLeft
        size={12}
        color={!hasPreviousPage ? COLOR_PALETTE.C_5B5B5B : ""}
        onClick={() => handlePaginationButtons(activePage - 1)}
        className={hasPreviousPage ? "cursor-pointer" : ""}
      />
      <div className="flex items-center gap-1 md:gap-2">
        {!!totalPages && totalPages > 4 ? (
          <>
            {/* first 2 page number */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              ?.slice(0, 2)
              ?.map((el) => (
                <MainBtn
                  key={el}
                  currentPage={el}
                  activePage={activePage}
                  handleFn={() => handlePaginationButtons(el)}
                />
              ))}
            {/* for second page number */}
            {activePage === 2 && (
              <MainBtn
                currentPage={activePage + 1}
                activePage={activePage}
                handleFn={() => handlePaginationButtons(activePage + 1)}
              />
            )}
            {/* middle section */}
            {activePage > 2 &&
              activePage !== totalPages &&
              activePage !== totalPages - 1 &&
              activePage < totalPages - 2 && (
                <>
                  {activePage !== 2 && (
                    <MainBtn
                      key={activePage}
                      currentPage={activePage}
                      activePage={activePage}
                      handleFn={() => handlePaginationButtons(activePage)}
                    />
                  )}
                  <MainBtn
                    currentPage={activePage + 1}
                    activePage={activePage}
                    handleFn={() => handlePaginationButtons(activePage + 1)}
                  />
                </>
              )}
            <PaginationMore />
            {/* for second and third last page number */}
            {(activePage === totalPages - 1 ||
              activePage === totalPages - 2) && (
              <MainBtn
                currentPage={totalPages - 2}
                activePage={activePage}
                handleFn={() => handlePaginationButtons(totalPages - 2)}
              />
            )}
            {/* last 2 page number */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              ?.slice(totalPages - 2, totalPages)
              ?.map((el) => (
                <MainBtn
                  key={el}
                  currentPage={el}
                  activePage={activePage}
                  handleFn={() => handlePaginationButtons(el)}
                />
              ))}
          </>
        ) : (
          <>
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((el) => (
              <MainBtn
                key={el}
                currentPage={el}
                activePage={activePage}
                handleFn={() => handlePaginationButtons(el)}
              />
            ))}
          </>
        )}
      </div>
      <FaChevronRight
        size={12}
        color={!hasNextPage ? COLOR_PALETTE.C_5B5B5B : ""}
        onClick={() => handlePaginationButtons(activePage + 1)}
        className={hasNextPage ? "cursor-pointer" : ""}
      />
    </div>
  );
};
