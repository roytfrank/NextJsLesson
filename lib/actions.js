"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

//All funtions in this file will be treated as sever action
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input.",
    };
    // react hook useActionState allows us to return the error like this
    // throw new Exception() is good for page exceptions
  }

  await saveMeal(meal);
  revalidatePath("/meals"); //throw away cache associated with the page
  redirect("/meals");
}
