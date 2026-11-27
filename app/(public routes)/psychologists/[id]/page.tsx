import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getPsychologistById } from "@/lib/api/psychologists";
import PsychologistDetailsCard from "@/components/PsychologistDetailsCard/PsychologistDetailsCard";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/store/seo";
import css from "./page.module.css";

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   try {
//     const camper = await getPsychologistById(id);
//     const description =
//       camper.description.length > 155
//         ? `${camper.description.slice(0, 155).trim()}…`
//         : camper.description;
//     const firstImage = [...camper.gallery].sort((a, b) => a.order - b.order)[0];

//     return buildMetadata({
//       title: camper.name,
//       description,
//       path: `/catalog/${id}`,
//       images: firstImage
//         ? [{ url: firstImage.original, alt: camper.name }]
//         : undefined,
//     });
//   } catch {
//     return {
//       title: "Camper not found",
//       robots: { index: false },
//     };
//   }
// }
type Props = {
  params: Promise<{ id: string }>;
};
export default async function CardDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["psychologist", id],
    queryFn: async () => (await getPsychologistById(id)).data,
  });
  return (
    <section className={`section ${css.pageSection}`}>
      <div className="container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PsychologistDetailsCard />
        </HydrationBoundary>
      </div>
    </section>
  );
}
