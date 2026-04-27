import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const tag = ""; // 👈 поки що без фільтра

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => {
      if (tag) {
        return fetchNotes({
          page: 1,
          perPage: 12,
          search: "",
          tag,
        });
      }

      return fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
      });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
