import React from "react";

export type PaginationType = {
  totalPages?: number;
  currentPage?: number;
  perPage?: number;
};

function PaginationComp({
  currentPage = 0,
  totalPages = 0,
  perPage = 0,
}: PaginationType) {
  return (
    <div className="w-full genp">
      <div className="flex flex-row gap-x-3">
        {currentPage - 2 > 1 && <button className="genbtn ">First</button>}

        {currentPage - 2 > 0 && (
          <button className="genbtn hidden sm:block">{currentPage - 2}</button>
        )}
        {currentPage - 1 > 0 && (
          <button className="genbtn">{currentPage - 1}</button>
        )}

        <button className="genbtn">{currentPage}</button>
        {currentPage + 1 <= totalPages && (
          <button className="genbtn">{currentPage + 1}</button>
        )}
        {currentPage + 2 <= totalPages && (
          <button className="genbtn hidden sm:block">{currentPage + 2}</button>
        )}
        {currentPage + 2 < totalPages && (
          <button className="genbtn">Last</button>
        )}
      </div>
    </div>
  );
}

export default PaginationComp;
