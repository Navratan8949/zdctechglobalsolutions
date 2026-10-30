import { Metadata } from "next";
import { ClientsContent } from "@/components/site/ClientsContent";
import { getClientsPageContent } from "@/service/client.service";
import { unwrapApiResponse } from "@/lib/public-api";
import {
  fallbackClientsPageContent,
  type ClientsPageContent,
} from "@/data/clients";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Clients | ZDC Tech Global Solutions",
  description:
    "Our trusted partners and clients around the world. Discover how ZDC Tech Global Solutions delivers custom software and digital products.",
  alternates: {
    canonical: "/clients",
  },
  openGraph: {
    title: "Clients | ZDC Tech Global Solutions",
    description:
      "Our trusted partners and clients around the world. Discover how ZDC Tech Global Solutions delivers custom software and digital products.",
    url: "https://zdctechglobalsolutions.com/clients",
  },
};

export default async function ClientsPage() {
  const raw = await getClientsPageContent().catch(() => null);
  const liveContent = unwrapApiResponse<ClientsPageContent>(raw);
  const initialContent =
    liveContent && liveContent.hero
      ? liveContent
      : fallbackClientsPageContent;

  return <ClientsContent initialContent={initialContent} />;
}
