import Footer from "@/components/footer/Footer";
import SearchBox from "@/components/searchcomponent/SearchBox";
import TopBar from "@/components/topBar/TopBar";
import React from "react";

function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopBar />

      <div className="w-full  max-w-5xl mx-auto bg-white genp rounded-md min-h-[calc(100vh-150px)]">
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default ManageLayout;
