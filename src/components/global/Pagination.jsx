import { FaAngleRight, FaChevronLeft } from "react-icons/fa6";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="p-3 text-base text-center bg-[#EDEDED] rounded-full w-[43px] h-[43px] "
        aria-label="Previous Page"
      >
        <FaChevronLeft color="#000000" />
      </button>

      <div className="bg-[#EDEDED] flex items-center px-2 py-1 rounded-[100px]">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-full w-[33px] h-[33px] flex items-center justify-center py-2 text-base 
              ${page === currentPage
                ? "text-white shadow-md bg-[#181818]"
                : "text-[#6D6D6D] px-4"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="rounded-full p-3 text-base text-center bg-[#EDEDED] w-[43px] h-[43px]"
        aria-label="Next Page"
      >
        <FaAngleRight color="#000000" />
      </button>
    </div>
  );
}
