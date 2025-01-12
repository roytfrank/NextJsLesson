import Link from "next/link";

export default function AllNews({ pageTitle, news }) {
  return (
    <>
      <h1>{pageTitle}</h1>
      <ul className="news-list">
        {news.map((newsItem) => {
          return (
            <li key={newsItem.id}>
              <Link href={`/news/${newsItem.slug}`}>
                <img
                  src={`/images/news/${newsItem.image}`}
                  alt={newsItem.title}
                />
                <span>{newsItem.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
