import Messages from "@/components/messages";
import { revalidatePath } from "next/cache";

export default async function MessagesPage() {
  const response = await fetch("http://localhost:8080/messages", {
    headers: {
      "X-ID": "page",
    },
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  revalidatePath("/message");
  return <Messages messages={messages} />;
}
