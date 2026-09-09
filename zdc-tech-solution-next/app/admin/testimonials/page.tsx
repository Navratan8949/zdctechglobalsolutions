"use client";

import {
  AdminResourceManager,
  type AdminResourceConfig,
  type AdminResourceItem,
} from "@/components/admin/AdminResourceManager";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialById,
  getTestimonials,
  updateTestimonial,
} from "@/service/testimonial.service";

interface TestimonialItem extends AdminResourceItem {
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar: { public_id: string; url: string };
  rating: number;
  status: "active" | "inactive";
}

const config: AdminResourceConfig<TestimonialItem> = {
  title: "Testimonials",
  description:
    "Manage customer quotes, attribution, ratings, and testimonial media.",
  singular: "Testimonial",
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "position", label: "Position", type: "text", required: true },
    { key: "company", label: "Company", type: "text", required: true },
    { key: "quote", label: "Quote", type: "richtext", required: true },
    { key: "avatar", label: "Avatar", type: "image" },
    {
      key: "rating",
      label: "Rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["active", "inactive"],
    },
  ],
  emptyDraft: {
    name: "",
    position: "",
    company: "",
    quote: "",
    avatar: { public_id: "", url: "" },
    rating: 5,
    status: "active",
  },
  getAll: getTestimonials,
  getById: getTestimonialById,
  create: createTestimonial,
  update: updateTestimonial,
  remove: deleteTestimonial,
  toDraft: (item) => ({
    name: item.name || "",
    position: item.position || "",
    company: item.company || "",
    quote: item.quote || "",
    avatar: {
      public_id: item.avatar?.public_id || "",
      url: item.avatar?.url || "",
    },
    rating: item.rating || 5,
    status: item.status || "active",
  }),
  getListLabel: (item) => item.name || "Unnamed testimonial",
  getListDescription: (item) =>
    `${item.company || "No company"} | ${item.rating || 0}/5`,
};

export default function TestimonialsPage() {
  return <AdminResourceManager config={config} />;
}
