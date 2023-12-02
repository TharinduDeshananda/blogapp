"use client";

import Link from "next/link";
import React, { useCallback, useState } from "react";

function SearchBox() {
  const [searchContent, setSearchContent] = useState("");
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchContent(e.currentTarget.value);
    },
    [setSearchContent]
  );
  return (
    <div className="flex items-center m-4 w-full max-w-5xl mx-auto justify-end bg-white genp rounded-md">
      <span className="mr-2 text-gray-600">🔍</span>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md text-sm outline-none w-full max-w-md text-gray"
        placeholder="search articles..."
        value={searchContent}
        onChange={handleSearchChange}
      />
      <Link href={`/search?value=${searchContent}`}>
        <button className="ml-2 genbtn">Search</button>
      </Link>
    </div>
  );
}

export default SearchBox;
