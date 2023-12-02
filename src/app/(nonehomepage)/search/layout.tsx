import Footer from "@/components/footer/Footer";
import SearchBox from "@/components/searchcomponent/SearchBox";
import TopBar from "@/components/topBar/TopBar";
import React from "react";

function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopBar />
      <div className="max-w-5xl mx-auto w-full">
        <SearchBox />
      </div>
      <div className="w-full min-h-screen">{children}</div>

      <Footer />
    </div>
  );
}

export default SearchLayout;
