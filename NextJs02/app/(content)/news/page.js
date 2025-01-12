import AllNews from "@/components/all-news";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();
  // Next Js extends fetch and add catching related features

  return (
    <>
      <AllNews news={news} pageTitle={"News Page"} />;
    </>
  );
}
