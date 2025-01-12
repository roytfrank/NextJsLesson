import { notFound, useRouter } from "next/navigation";
import GoBack from "@/components/go-back";
import { getNewsItem } from "@/lib/querynews";
//import { useRouter } from "next/router";
// now you can make this component async to get data since GoBack is client comp

export default async function InterceptedImagePage({ params }) {
  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <h1>This is getting intercepted</h1>
      <GoBack />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
