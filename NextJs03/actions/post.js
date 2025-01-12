"use server";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

//because we are passing the server action 'createPost' to useFormState hook, we get 2 args
//if it is used directly on <form action={createPost} we get 1 arg formData.
export async function createPost(prevState, formData) {
  // must be inside the function. Tells react this action is server action, server actions are async
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.log(error);
    throw new Error(
      "Image upload faile. Post was not created. Please try again later"
    );
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath("/feed");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  // formData can be passed as second argument since using bind and receiving post id
  console.log(postId);
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
  //all pages wrapped by root layout revalidatePath("/", 'layout); // all pages
}
