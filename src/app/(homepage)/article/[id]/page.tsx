import React from "react";

function ArticlePage({ params }: { params: { id: number } }) {
  return (
    <div className="w-full min-h-screen max-w-5xl mx-auto bg-white genp rounded-md">
      <h1 className="genh">Most recent.. </h1>
      <h2>{params.id}</h2>
    </div>
  );
}

export default ArticlePage;
