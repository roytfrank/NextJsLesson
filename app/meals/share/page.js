//since use server directive actions is now a separate module shareMeal, we can use use client in this page now
"use client";
import { useFormState } from "react-dom";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import ImagePicker from "@/components/meals/image-picker";
import MealsShareForm from "@/components/meals/meals-share-form";

export default function ShareMealPage() {
  const [currResponse, formAction] = useFormState(shareMeal, {
    message: null,
  });
  // 1 arg server action 2. default response value
  // formAction is used now as the action
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div style={{ color: "red", fontSize: "30px" }}>
            {currResponse.message && <p>{currResponse.message}</p>}
          </div>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
            ></textarea>
          </p>
          <ImagePicker name="image" label="Upload Image" />
          <p className={classes.actions}>
            <MealsShareForm />
          </p>
        </form>
      </main>
    </>
  );
}
