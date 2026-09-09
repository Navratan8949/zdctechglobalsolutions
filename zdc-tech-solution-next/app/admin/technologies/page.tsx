"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createTechnology,
  deleteTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
} from "@/service/technology.service";

interface TechnologyItem extends AdminResourceItem {
  category: string;
  icon: string;
  technologies: string[];
  status: "active" | "inactive";
}

const config: AdminResourceConfig<TechnologyItem> = {
  title: "Technologies",
  description:
    "Manage technology categories and the tools shown across your website.",
  singular: "Technology category",
  fields: [
    { key: "category", label: "Category", type: "text", required: true },
    {
      key: "icon",
      label: "Icon",
      type: "icon",
      required: true,
      placeholder: "Icon name or URL",
    },
    {
      key: "technologies",
      label: "Technologies",
      type: "array",
      required: true,
      placeholder: "Technology name",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["active", "inactive"],
    },
  ],
  emptyDraft: { category: "", icon: "", technologies: [""], status: "active" },
  getAll: getTechnologies,
  getById: getTechnologyById,
  create: createTechnology,
  update: updateTechnology,
  remove: deleteTechnology,
  toDraft: (item) => ({
    category: item.category || "",
    icon: item.icon || "",
    technologies: item.technologies?.length ? item.technologies : [""],
    status: item.status || "active",
  }),
  getListLabel: (item) => item.category || "Unnamed category",
  getListDescription: (item) =>
    item.technologies?.join(", ") || "No technologies",
};

export default function TechnologiesPage() {
  return <AdminResourceManager config={config} />;
}
