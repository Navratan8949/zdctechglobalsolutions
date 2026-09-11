"use client";

import { AdminResourceManager, type AdminResourceItem } from "@/components/admin/AdminResourceManager";
import {
  createWhyChooseUs,
  deleteWhyChooseUs,
  getWhyChooseUs,
  getWhyChooseUsById,
  updateWhyChooseUs,
} from "@/service/whyChooseUs.service";

interface WhyChooseUsItem extends AdminResourceItem {
  title: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
}

export default function WhyChooseUsAdmin() {
  return (
    <AdminResourceManager<WhyChooseUsItem>
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
