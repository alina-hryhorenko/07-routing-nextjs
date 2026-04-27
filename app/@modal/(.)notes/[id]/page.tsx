"use client";

import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { useRouter } from "next/navigation";

export default function ModalNotePage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient />
    </Modal>
  );
}
