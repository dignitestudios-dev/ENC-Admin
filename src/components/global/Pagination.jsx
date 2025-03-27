import { useState } from "react";
import { FaAngleRight, FaChevronLeft } from "react-icons/fa6";
export default function Pagination() {
  const [pageNo, setPageNo] = useState(1);
  const totalPages = 3;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
        className="p-3 text-base text-center bg-[#EDEDED] rounded-full w-[43px] h-[43px] "
        aria-label="Previous Page"
      >
        <FaChevronLeft color="#000000" />
      </button>
      {/* ${
                pageNo == 1
                  ? "rounded-l-xl"
                  : pageNo == pages?.length
                  ? "rounded-r-xl"
                  : "rounded-xl"
              }   */}
      <div className="bg-[#EDEDED] flex items-center px-2 py-1 rounded-[100px]">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`rounded-full w-[33px] h-[33px]  flex items-center justify-center   py-2 text-base 
                          
              ${
                page === pageNo
                  ? "text-white shadow-md   bg-[#181818]"
                  : "text-[#6D6D6D] px-4"
              }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => setPageNo((prev) => Math.min(prev + 1, totalPages))}
        className="rounded-full p-3 text-base text-center bg-[#EDEDED]  w-[43px] h-[43px] "
        aria-label="Next Page"
      >
        <FaAngleRight color="#000000" />
      </button>
    </div>
  );
}
