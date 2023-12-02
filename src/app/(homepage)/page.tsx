import ArticleCard from "@/components/articleCard/ArticleCard";
import ArticleItem from "@/components/articleitem/ArticleItem";

export default function Home() {
  return (
    <div className="w-full min-h-screen max-w-5xl mx-auto bg-white genp rounded-md">
      <h1 className="genh">Most recent..</h1>
      <div className="w-full min-h-[400px] flex justify-center items-center ">
        <ArticleCard />
      </div>
      <h1 className="genh">Recently added</h1>
      <div className="flex w-full flex-col gap-y-5">
        <ArticleItem />
      </div>
    </div>
  );
}
