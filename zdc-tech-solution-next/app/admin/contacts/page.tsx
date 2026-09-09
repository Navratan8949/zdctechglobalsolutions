"use client";

import {
  AdminCommunicationManager,
  type AdminCommunicationConfig,
  type CommunicationItem,
} from "@/components/admin/AdminCommunicationManager";
import {
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "@/service/contact.service";

interface ContactItem extends CommunicationItem {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  inquiryType: string;
  jobSlug?: string;
  position?: string;
  message: string;
  status: "pending" | "in_progress" | "resolved";
}

const config: AdminCommunicationConfig<ContactItem> = {
  title: "Contacts",
  description:
    "Review contact form submissions and track their resolution status.",
  singular: "Contact",
  emptyMessage: "No contact messages have been received.",
  statusOptions: ["pending", "in_progress", "resolved"],
  getAll: getContacts,
  getById: getContactById,
  update: updateContact,
  remove: deleteContact,
  getListLabel: (item) => item.name || "Unnamed contact",
  getListDescription: (item) =>
    `${item.email} · ${item.inquiryType || "general"}`,
  detailFields: [
    { label: "Email", getValue: (item) => item.email },
    { label: "Phone", getValue: (item) => item.phone || "" },
    { label: "Company", getValue: (item) => item.company || "" },
    { label: "Service", getValue: (item) => item.service || "" },
    { label: "Budget", getValue: (item) => item.budget || "" },
    {
      label: "Inquiry type",
      getValue: (item) => item.inquiryType || "general",
    },
    { label: "Position", getValue: (item) => item.position || "" },
    { label: "Message", getValue: (item) => item.message, multiline: true },
  ],
};

export default function ContactsPage() {
  return <AdminCommunicationManager config={config} />;
}
