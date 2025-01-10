"use client";

//Next js passes a prop {error} by default
export default function Error({ error }) {
  return (
    <main className="error">
      <h1> An error occurred!</h1>
      <p>Failed to get data for meals. Please try gain later {error.message}</p>
    </main>
  );
}
