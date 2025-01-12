import { getLatestNews } from "@/lib/news";
import AllNews from "@/components/all-news";

export default function LatestNewsPage() {
  return <AllNews news={getLatestNews()} pageTitle={"Latest News"} />;
}
