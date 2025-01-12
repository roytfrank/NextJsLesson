"use client";
import AllNews from "@/components/all-news";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/news");

      if (!response) {
        setError("Failt to load data");
        setIsLoading(false);
      } else {
        const news = await response.json();
        setNews(news);
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let newsContent;
  if (news) {
    newsContent = <AllNews news={news} pageTitle={"News Page"} />;
  }
  return <>{newsContent}</>;
}
