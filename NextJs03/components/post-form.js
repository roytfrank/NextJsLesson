"use client";
import { useFormState } from "react-dom";
import FormSubmit from "@/components/form-submit";

export default function PostForm({ action }) {
  const [currState, formAction] = useFormState(action, {}); //the second arg is the errors object
  //call directly in component that ouput the form
  //formAction handles any data returned should be register for the currState
  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <div className="form-actions">
          <FormSubmit />
        </div>
        {currState.errors && (
          <ul className="form-errors">
            {currState.errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}
      </form>
    </>
  );
}
