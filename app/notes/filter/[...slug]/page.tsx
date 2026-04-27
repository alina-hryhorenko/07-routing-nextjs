import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const selectedTag = slug[0];
  const tag = selectedTag === "all" ? undefined : selectedTag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        ...(tag ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
