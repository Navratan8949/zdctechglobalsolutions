"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createCoreValue,
  deleteCoreValue,
  getCoreValueById,
  getCoreValues,
  updateCoreValue,
} from "@/service/coreValue.service";

interface CoreValueItem extends AdminResourceItem {
  title: string;
  description: string;
  icon: string;
  order: number;
}

const config: AdminResourceConfig<CoreValueItem> = {
  title: "Core Values",
  description: "Manage the company's core values section.",
  singular: "Core Value",
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true },
    { key: "icon", label: "Lucide Icon Name", type: "text", required: true },
    { key: "order", label: "Display Order", type: "text" },
  ],
  emptyDraft: { title: "", description: "", icon: "Star", order: 0 },
  getAll: getCoreValues,
  getById: getCoreValueById,
  create: createCoreValue,
  update: updateCoreValue,
  remove: deleteCoreValue,
  toDraft: (item) => ({
    title: item.title || "",
    description: item.description || "",
    icon: item.icon || "Star",
    order: item.order || 0,
  }),
  getListLabel: (item) => item.title || "Untitled",
  getListDescription: (item) => item.description || "",
};

export default function CoreValuesPage() {
  return <AdminResourceManager config={config} />;
}
