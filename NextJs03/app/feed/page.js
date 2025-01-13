import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

//static metadata
// export const metadata = {
//   title: "Feed Posts",
//   description: "Browsing our latest feed posts",
// };

// dynamic metatadata
export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all ourt ${numberOfPosts}`,
    description: "Browse number of posts on page",
  };
}
export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
