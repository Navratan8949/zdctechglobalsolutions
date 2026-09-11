"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createLifeAtCompany,
  deleteLifeAtCompany,
  getLifeAtCompanyById,
  getLifeAtCompany,
  updateLifeAtCompany,
} from "@/service/lifeAtCompany.service";

interface LifeAtCompanyItem extends AdminResourceItem {
  title: string;
  description: string;
  icon: string;
  order: number;
}

const config: AdminResourceConfig<LifeAtCompanyItem> = {
  title: "Life at Company",
  description: "Manage the items shown in the Life at ZDC section.",
  singular: "Item",
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true },
    { key: "icon", label: "Lucide Icon Name", type: "text", required: true },
    { key: "order", label: "Display Order", type: "text" },
  ],
  emptyDraft: { title: "", description: "", icon: "Heart", order: 0 },
  getAll: getLifeAtCompany,
  getById: getLifeAtCompanyById,
  create: createLifeAtCompany,
  update: updateLifeAtCompany,
  remove: deleteLifeAtCompany,
  toDraft: (item) => ({
    title: item.title || "",
    description: item.description || "",
    icon: item.icon || "Heart",
    order: item.order || 0,
  }),
  getListLabel: (item) => item.title || "Untitled",
  getListDescription: (item) => item.description || "",
};

export default function LifeAtCompanyPage() {
  return <AdminResourceManager config={config} />;
}
