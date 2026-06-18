"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationSection({ totalCount, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 3;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/recipes?${params.toString()}`);
  };

  const startRange = totalCount > 0 && (currentPage - 1) * itemsPerPage < totalCount
    ? (currentPage - 1) * itemsPerPage + 1
    : 0;
  const endRange = startRange > 0 ? Math.min(currentPage * itemsPerPage, totalCount) : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
      <p>
        Showing {startRange} to {endRange} of {totalCount} recipes
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 transition-all"
        >
          <ChevronLeft size={14} />
        </button>

        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span key={`dots-${index}`} className="px-1 text-zinc-400">
                ...
              </span>
            );
          }
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold border transition-all ${
                currentPage === pageNum
                  ? "bg-[#00693E] border-[#00693E] text-white"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 transition-all"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
