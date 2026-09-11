"use client";

import { AdminResourceManager } from "@/components/admin/AdminResourceManager";
import {
  createWhyChooseUs,
  deleteWhyChooseUs,
  getWhyChooseUs,
  getWhyChooseUsById,
  updateWhyChooseUs,
  type WhyChooseUsData,
} from "@/service/whyChooseUs.service";

export default function WhyChooseUsAdmin() {
  return (
    <AdminResourceManager<WhyChooseUsData>
      config={{
        title: "Why Choose Us",
        description:
          "Manage the reasons to partner with you displayed on the homepage.",
        singular: "Reason",
        emptyDraft: {
          title: "",
          description: "",
          image: { public_id: "", url: "" },
        },
        fields: [
          {
            key: "title",
            label: "Title",
            type: "text",
            required: true,
            placeholder: "e.g., Client-Centric Approach",
          },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            required: true,
            placeholder: "Detailed explanation of this reason...",
          },
          {
            key: "image",
            label: "Image",
            type: "image",
            required: true,
          },
        ],
        getAll: getWhyChooseUs,
        getById: getWhyChooseUsById,
        create: createWhyChooseUs,
        update: updateWhyChooseUs,
        remove: deleteWhyChooseUs,
        toDraft: (item) => ({
          title: item.title,
          description: item.description,
          image: item.image || { public_id: "", url: "" },
        }),
        getListLabel: (item) => item.title,
        getListDescription: (item) => item.description,
      }}
    />
  );
}
