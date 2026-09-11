"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createProcessStep,
  deleteProcessStep,
  getProcessStepById,
  getProcessSteps,
  updateProcessStep,
} from "@/service/processStep.service";

interface ProcessStepItem extends AdminResourceItem {
  step: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

const config: AdminResourceConfig<ProcessStepItem> = {
  title: "Process Steps",
  description: "Manage the steps shown in the process timeline section.",
  singular: "Process Step",
  fields: [
    { key: "step", label: "Step Number (e.g., 01)", type: "text", required: true },
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true },
    { key: "icon", label: "Lucide Icon Name (e.g., Search, Code2)", type: "text", required: true },
    { key: "order", label: "Display Order", type: "text" },
  ],
  emptyDraft: { step: "", title: "", description: "", icon: "CheckCircle", order: 0 },
  getAll: getProcessSteps,
  getById: getProcessStepById,
  create: createProcessStep,
  update: updateProcessStep,
  remove: deleteProcessStep,
  toDraft: (item) => ({
    step: item.step || "",
    title: item.title || "",
    description: item.description || "",
    icon: item.icon || "CheckCircle",
    order: item.order || 0,
  }),
  getListLabel: (item) => `${item.step} - ${item.title}`,
  getListDescription: (item) => item.description || "",
};

export default function ProcessStepsPage() {
  return <AdminResourceManager config={config} />;
}
