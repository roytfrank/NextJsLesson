"use client";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();
  return <div className="modal-backdrop" onClick={router.back}></div>;
}
