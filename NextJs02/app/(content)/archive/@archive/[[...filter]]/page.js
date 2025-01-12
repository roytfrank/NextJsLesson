import {
  getNewsForYear,
  getAvailableNewsYears,
  getNewsForYearAndMonth,
  getAvailableNewsMonths,
} from "@/lib/querynews";
import AllNews from "@/components/all-news";
import Link from "next/link";
import { getArchivedNews } from "@/lib/news";
import { Suspense } from "react";

async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid filter");
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news = getArchivedNews();

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period</p>;

  if (news && news.length > 0) {
    newsContent = <AllNews news={news} pageTitle={`Archive News`} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1]; // you can check all segment items

  return (
    <>
      <Suspense fallback={<p>Loading links...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <div>
        <Suspense fallback={<p>Loading news...</p>}>
          <FilteredNews year={selectedYear} month={selectedMonth} />
        </Suspense>
      </div>
    </>
  );
}
