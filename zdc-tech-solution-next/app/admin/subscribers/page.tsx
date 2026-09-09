"use client";

import {
  AdminCommunicationManager,
  type AdminCommunicationConfig,
  type CommunicationItem,
} from "@/components/admin/AdminCommunicationManager";
import {
  deleteSubscriber,
  getSubscriberById,
  getSubscribers,
  updateSubscriber,
} from "@/service/subscriber.service";

interface SubscriberItem extends CommunicationItem {
  email: string;
  status: "active" | "unsubscribed";
}

const config: AdminCommunicationConfig<SubscriberItem> = {
  title: "Subscribers",
  description: "Manage newsletter subscribers and their subscription status.",
  singular: "Subscriber",
  emptyMessage: "No newsletter subscribers have been received.",
  statusOptions: ["active", "unsubscribed"],
  getAll: getSubscribers,
  getById: getSubscriberById,
  update: updateSubscriber,
  remove: deleteSubscriber,
  getListLabel: (item) => item.email,
  getListDescription: (item) =>
    `Joined ${item.createdAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(item.createdAt)) : "date unavailable"}`,
  detailFields: [
    { label: "Email", getValue: (item) => item.email },
    {
      label: "Created",
      getValue: (item) =>
        item.createdAt
          ? new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(item.createdAt))
          : "",
    },
    {
      label: "Last updated",
      getValue: (item) =>
        item.updatedAt
          ? new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(item.updatedAt))
          : "",
    },
  ],
};

export default function SubscribersPage() {
  return <AdminCommunicationManager config={config} />;
}
