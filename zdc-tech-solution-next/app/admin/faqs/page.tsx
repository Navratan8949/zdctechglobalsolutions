"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createFaq,
  deleteFaq,
  getFaqById,
  getFaqs,
  updateFaq,
} from "@/service/faq.service";

interface FaqItem extends AdminResourceItem {
  question: string;
  answer: string;
  status: "active" | "inactive";
}

const config: AdminResourceConfig<FaqItem> = {
  title: "FAQs",
  description:
    "Keep the answers to common customer questions current and publish-ready.",
  singular: "FAQ",
  fields: [
    { key: "question", label: "Question", type: "text", required: true },
    { key: "answer", label: "Answer", type: "textarea", required: true },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["active", "inactive"],
    },
  ],
  emptyDraft: { question: "", answer: "", status: "active" },
  getAll: getFaqs,
  getById: getFaqById,
  create: createFaq,
  update: updateFaq,
  remove: deleteFaq,
  toDraft: (item) => ({
    question: item.question || "",
    answer: item.answer || "",
    status: item.status || "active",
  }),
  getListLabel: (item) => item.question || "Untitled question",
  getListDescription: (item) => item.answer || "No answer",
};

export default function FaqsPage() {
  return <AdminResourceManager config={config} />;
}
