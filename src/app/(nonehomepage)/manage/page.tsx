"use client";
import ArticleItem from "@/components/articleitem/ArticleItem";
import ManageArticleItem from "@/components/articleitem/ManageArticleItem";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import PaginationComp from "@/components/paginationcomp/PaginationComp";
import fetchArtciles from "@/controller/article/ArticleController";
import React, { useState } from "react";
import { useQuery, useIsFetching } from "react-query";
import { json } from "stream/consumers";

function ManagePage() {
  const [searchContent, setSearchContent] = useState("");
  const [queryEnabled, setQueryEnabled] = useState(true);
  const isFetching = useIsFetching();

  const searchQuery = useQuery({
    queryKey: ["article", searchContent],
    queryFn: async ({ queryKey }) => {
      try {
        const results = await fetchArtciles({ title: queryKey[1] });
        setQueryEnabled(false);
        return results;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: queryEnabled,
  });

  return (
    <div className="w-full">
      {isFetching > 0 && <LoadingComp />}
      <button className="genbtn text-xs lg:text-base">
        Create New Article
      </button>
      {/* post filter */}
      <div className="w-full flex justify-center">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md text-sm outline-none w-full max-w-md text-gray"
          placeholder="search articles..."
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setQueryEnabled(true);
            }
          }}
        />
      </div>

      {/* post filter result */}
      <PaginationComp currentPage={4} totalPages={20} />
      <div className="flex flex-col gap-y-5">
        {searchQuery.isSuccess &&
          searchQuery.data.map((i: string, index: number) => (
            <ManageArticleItem key={index + i} />
          ))}
      </div>
    </div>
  );
}

export default ManagePage;
