"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createStat,
  deleteStat,
  getStatById,
  getStats,
  updateStat,
} from "@/service/stat.service";

interface StatItem extends AdminResourceItem {
  value: number;
  suffix: string;
  label: string;
  order: number;
}

const config: AdminResourceConfig<StatItem> = {
  title: "Company Stats",
  description: "Manage the statistics shown in the counter section.",
  singular: "Stat",
  fields: [
    { key: "value", label: "Value (Number)", type: "text", required: true },
    { key: "suffix", label: "Suffix (e.g., +, %)", type: "text" },
    { key: "label", label: "Label (e.g., Projects Delivered)", type: "text", required: true },
    { key: "order", label: "Display Order", type: "text" },
  ],
  emptyDraft: { value: 0, suffix: "", label: "", order: 0 },
  getAll: getStats,
  getById: getStatById,
  create: createStat,
  update: updateStat,
  remove: deleteStat,
  toDraft: (item) => ({
    value: item.value || 0,
    suffix: item.suffix || "",
    label: item.label || "",
    order: item.order || 0,
  }),
  getListLabel: (item) => `${item.value}${item.suffix} ${item.label}`,
  getListDescription: (item) => `Order: ${item.order || 0}`,
};

export default function StatsPage() {
  return <AdminResourceManager config={config} />;
}
