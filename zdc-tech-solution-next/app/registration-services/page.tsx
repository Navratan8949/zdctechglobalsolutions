import { Metadata } from "next";
import { RegistrationServicesContent } from "@/components/site/RegistrationServicesContent";
import { getRegistrationServices } from "@/service/registrationService.service";
import { unwrapApiResponse } from "@/lib/public-api";
import {
  fallbackRegistrationServices,
  type RegistrationServiceItem,
} from "@/data/registrationServices";

export const metadata: Metadata = {
  title: "NGO & Company Registration Services | ZDC Tech Solutions",
  description:
    "Expert NGO and Company Registration services in India. Complete assistance for Trust, Society, Section 8, 12A/12AB, 80G, CSR-1, FCRA, Pvt Ltd, LLP, OPC, GST, MSME, Startup India, and Trademark registrations.",
  keywords: [
    "NGO Registration",
    "Company Registration",
    "Trust Registration",
    "Society Registration",
    "Section 8 Company",
    "12A 80G Registration",
    "NGO Darpan",
    "CSR-1 Registration",
    "Private Limited Company",
    "LLP Registration",
    "GST Registration",
    "MSME Udyam Registration",
    "Startup India Registration",
    "Trademark Registration",
    "ZDC Tech Solutions",
  ],
  openGraph: {
    title: "NGO & Company Registration Services | ZDC Tech Solutions",
    description:
      "All-in-one government registration, certification, legal compliance, and approval services for non-profits and private businesses.",
    type: "website",
  },
};

export const revalidate = 60; // ISR cache revalidation every minute

export default async function RegistrationServicesPage() {
  let initialServices: RegistrationServiceItem[] = fallbackRegistrationServices;

  try {
    const response = await getRegistrationServices();
    const unpacked = unwrapApiResponse<RegistrationServiceItem[]>(response);
    if (Array.isArray(unpacked) && unpacked.length > 0) {
      initialServices = unpacked;
    }
  } catch {
    // Graceful fallback to static data if API is temporarily unavailable
    initialServices = fallbackRegistrationServices;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <RegistrationServicesContent initialServices={initialServices} />
    </main>
  );
}

