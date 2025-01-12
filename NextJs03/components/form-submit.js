"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const status = useFormStatus();
  //give status around a form

  if (status.pending) {
    return <p>Creating Post...</p>;
  }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
