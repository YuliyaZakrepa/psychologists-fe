// app/(public routes)/psychologists/page.tsx
import { cookies } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { serverApi } from "@/lib/api/serverApi";
import { DEFAULT_FILTER } from "@/types/constants";
import type { PsychologistsResponse } from "@/types/psychologist";
import CatalogClient from "@/components/CatalogClient/CatalogClient";

export default async function Psychologists() {
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["psychologists", DEFAULT_FILTER],
    queryFn: async ({ pageParam }) => {
      const { data } = await serverApi.get<PsychologistsResponse>(
        "/psychologists",
        {
          params: { filter: DEFAULT_FILTER, page: pageParam },
          headers: { Cookie: cookieStore.toString() },
        }
      );
      return data;
    },
    initialPageParam: 1,
  });

  return (
    <div className="container">
      <section className="section">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CatalogClient />
        </HydrationBoundary>
      </section>
    </div>
  );
}
