// now we can add use client directive here and keep the PostForm codes. Outsourcing server actions
import PostForm from "@/components/post-form";
import { createPost } from "@/actions/post";

export default function NewPostPage() {
  return <PostForm action={createPost} />;
}
