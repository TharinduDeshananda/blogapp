"use client";
import ArticleItem from "@/components/articleitem/ArticleItem";
import ManageArticleItem from "@/components/articleitem/ManageArticleItem";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import PaginationComp from "@/components/paginationcomp/PaginationComp";
import fetchArtciles from "@/controller/article/ArticleController";
import { String } from "aws-sdk/clients/cloudhsm";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery, useIsFetching } from "react-query";
import { toast } from "react-toastify";
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
    onError: (e) => {
      toast.error("Post fetch failed");
    },
  });

  return (
    <div className="w-full">
      {isFetching > 0 && <LoadingComp />}

      <Link href={"/manage/new-article"}>
        <button className="genbtn text-xs lg:text-base">
          Create New Article
        </button>
      </Link>

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
          searchQuery.data.map(
            (
              i: { title: string; titleImage: string; _id: string },
              index: number
            ) => (
              <ManageArticleItem
                key={index}
                title={i.title}
                imageUrl={i.titleImage}
                id={i._id}
              />
            )
          )}
      </div>
    </div>
  );
}

export default ManagePage;
