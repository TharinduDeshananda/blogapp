import React from "react";

function LoadingComp() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-12 h-12 border-b-2 border-r-2 border-blue-500 animate-spin rounded-full"></div>
    </div>
  );
}

export default LoadingComp;
