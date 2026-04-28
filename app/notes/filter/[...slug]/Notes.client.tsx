"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

interface Props {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, "", tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: "",
        ...(tag ? { tag } : {}),
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <>
      <NoteList notes={data?.notes ?? []} />

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
