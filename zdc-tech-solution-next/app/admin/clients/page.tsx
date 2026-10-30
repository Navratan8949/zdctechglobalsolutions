"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  Layers,
  Loader2,
  Plus,
  Save,
  Trash2,
  Building2,
  Sparkles,
  ShieldCheck,
  Briefcase,
  X,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { IconPicker } from "@/components/admin/IconPicker";
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
  getClientsPageContent,
  updateClientsPageContent,
} from "@/service/client.service";
import {
  fallbackClientsPageContent,
  type ClientsPageContent,
  type EngagementModelItem,
  type IndustryItem,
} from "@/data/clients";
import { getIcon } from "@/lib/icons";

interface ClientItem {
  _id: string;
  name: string;
  logo: { public_id: string; url: string };
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

type ClientDraft = Omit<ClientItem, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { data?: T; message?: string };

const emptyClientDraft: ClientDraft = {
  name: "",
  logo: { public_id: "", url: "" },
  status: "active",
};

function unwrap<T>(response: ApiResponse<T> | T): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    (response as any).data !== undefined
  )
    return (response as any).data as T;
  return response as T;
}

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function toClientDraft(item: ClientItem): ClientDraft {
  return {
    name: item.name || "",
    logo: { public_id: item.logo?.public_id || "", url: item.logo?.url || "" },
    status: item.status || "active",
  };
}

export default function AdminClientsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();

  // Active Tab: "content" (Page Content & Sections) or "logos" (Partnership Logos)
  const [activeTab, setActiveTab] = useState<"content" | "logos">("content");

  // --- Page Content State ---
  const [pageContent, setPageContent] = useState<ClientsPageContent>(
    fallbackClientsPageContent
  );
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isContentSaving, setIsContentSaving] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);
  const [contentFeedback, setContentFeedback] = useState<string | null>(null);

  // --- Client Logos State ---
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientDraft, setClientDraft] =
    useState<ClientDraft>(emptyClientDraft);
  const [isClientsLoading, setIsClientsLoading] = useState(true);
  const [isClientSubmitting, setIsClientSubmitting] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [clientFeedback, setClientFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthLoading, isAuthenticated, router]);

  // Load Page Content
  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    const loadContent = async () => {
      setIsContentLoading(true);
      setContentError(null);
      try {
        const res = unwrap<ClientsPageContent>(await getClientsPageContent());
        if (res && res.hero) {
          setPageContent({
            hero: { ...fallbackClientsPageContent.hero, ...(res.hero || {}) },
            partnerships: {
              ...fallbackClientsPageContent.partnerships,
              ...(res.partnerships || {}),
            },
            engagementModels: {
              ...fallbackClientsPageContent.engagementModels,
              ...(res.engagementModels || {}),
              models:
                Array.isArray(res.engagementModels?.models) &&
                res.engagementModels.models.length > 0
                  ? res.engagementModels.models
                  : fallbackClientsPageContent.engagementModels.models,
            },
            domainExpertise: {
              ...fallbackClientsPageContent.domainExpertise,
              ...(res.domainExpertise || {}),
              industries:
                Array.isArray(res.domainExpertise?.industries) &&
                res.domainExpertise.industries.length > 0
                  ? res.domainExpertise.industries
                  : fallbackClientsPageContent.domainExpertise.industries,
            },
            trustAndSecurity: {
              ...fallbackClientsPageContent.trustAndSecurity,
              ...(res.trustAndSecurity || {}),
              standards:
                Array.isArray(res.trustAndSecurity?.standards) &&
                res.trustAndSecurity.standards.length > 0
                  ? res.trustAndSecurity.standards
                  : fallbackClientsPageContent.trustAndSecurity.standards,
            },
          });
        }
      } catch (err) {
        setContentError(getErrorMessage(err));
      } finally {
        setIsContentLoading(false);
      }
    };
    void loadContent();
  }, [isAuthLoading, isAuthenticated]);

  // Load Client Logos
  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    const loadClients = async () => {
      setIsClientsLoading(true);
      setClientError(null);
      try {
        const data = unwrap<ClientItem[]>(await getClients());
        setClients(data || []);
        if (data?.length) {
          setSelectedClientId(data[0]._id);
          setClientDraft(toClientDraft(data[0]));
        }
      } catch (err) {
        setClientError(getErrorMessage(err));
      } finally {
        setIsClientsLoading(false);
      }
    };
    void loadClients();
  }, [isAuthLoading, isAuthenticated]);

  // --- Handlers for Page Content ---
  const handleSavePageContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContentSaving(true);
    setContentError(null);
    setContentFeedback(null);
    try {
      const res = unwrap<ClientsPageContent>(
        await updateClientsPageContent(pageContent)
      );
      if (res && res.hero) {
        setPageContent(res);
      }
      setContentFeedback("Clients page content updated successfully!");
    } catch (err) {
      setContentError(getErrorMessage(err));
    } finally {
      setIsContentSaving(false);
    }
  };

  // Engagement Models helpers
  const handleAddModel = () => {
    setPageContent((prev) => ({
      ...prev,
      engagementModels: {
        ...prev.engagementModels,
        models: [
          ...prev.engagementModels.models,
          {
            icon: "Users",
            title: "New Engagement Model",
            description: "Describe how this collaboration model delivers value to clients.",
          },
        ],
      },
    }));
  };

  const handleUpdateModel = (
    index: number,
    field: keyof EngagementModelItem,
    value: string
  ) => {
    setPageContent((prev) => {
      const updated = [...prev.engagementModels.models];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        engagementModels: { ...prev.engagementModels, models: updated },
      };
    });
  };

  const handleRemoveModel = (index: number) => {
    setPageContent((prev) => {
      const updated = prev.engagementModels.models.filter((_, i) => i !== index);
      return {
        ...prev,
        engagementModels: {
          ...prev.engagementModels,
          models:
            updated.length > 0
              ? updated
              : [
                  {
                    icon: "Users",
                    title: "",
                    description: "",
                  },
                ],
        },
      };
    });
  };

  // Domain Expertise helpers
  const handleAddIndustry = () => {
    setPageContent((prev) => ({
      ...prev,
      domainExpertise: {
        ...prev.domainExpertise,
        industries: [
          ...prev.domainExpertise.industries,
          {
            title: "New Industry Domain",
            description: "Custom software solutions and digital products designed for this sector.",
          },
        ],
      },
    }));
  };

  const handleUpdateIndustry = (
    index: number,
    field: keyof IndustryItem,
    value: string
  ) => {
    setPageContent((prev) => {
      const updated = [...prev.domainExpertise.industries];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        domainExpertise: { ...prev.domainExpertise, industries: updated },
      };
    });
  };

  const handleRemoveIndustry = (index: number) => {
    setPageContent((prev) => {
      const updated = prev.domainExpertise.industries.filter((_, i) => i !== index);
      return {
        ...prev,
        domainExpertise: {
          ...prev.domainExpertise,
          industries:
            updated.length > 0
              ? updated
              : [
                  {
                    title: "",
                    description: "",
                  },
                ],
        },
      };
    });
  };

  // Trust & Security standards helpers
  const handleAddStandard = () => {
    setPageContent((prev) => ({
      ...prev,
      trustAndSecurity: {
        ...prev.trustAndSecurity,
        standards: [...prev.trustAndSecurity.standards, ""],
      },
    }));
  };

  const handleUpdateStandard = (index: number, val: string) => {
    setPageContent((prev) => {
      const updated = [...prev.trustAndSecurity.standards];
      updated[index] = val;
      return {
        ...prev,
        trustAndSecurity: { ...prev.trustAndSecurity, standards: updated },
      };
    });
  };

  const handleRemoveStandard = (index: number) => {
    setPageContent((prev) => {
      const updated = prev.trustAndSecurity.standards.filter((_, i) => i !== index);
      return {
        ...prev,
        trustAndSecurity: {
          ...prev.trustAndSecurity,
          standards: updated.length > 0 ? updated : [""],
        },
      };
    });
  };

  // --- Handlers for Client Logos ---
  const handleSelectClient = async (id: string) => {
    setClientError(null);
    setClientFeedback(null);
    try {
      const item = unwrap<ClientItem>(await getClientById(id));
      setSelectedClientId(item._id);
      setClientDraft(toClientDraft(item));
    } catch (err) {
      setClientError(getErrorMessage(err));
    }
  };

  const handleStartNewClient = () => {
    setSelectedClientId(null);
    setClientDraft({ ...emptyClientDraft, logo: { ...emptyClientDraft.logo } });
    setClientError(null);
    setClientFeedback(null);
  };

  const handleSubmitClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsClientSubmitting(true);
    setClientError(null);
    setClientFeedback(null);
    try {
      const saved = unwrap<ClientItem>(
        selectedClientId
          ? await updateClient(selectedClientId, clientDraft)
          : await createClient(clientDraft)
      );
      setClients((current) =>
        selectedClientId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current]
      );
      setSelectedClientId(saved._id);
      setClientDraft(toClientDraft(saved));
      setClientFeedback(
        selectedClientId
          ? "Client logo updated successfully."
          : "Client logo added successfully."
      );
    } catch (err) {
      setClientError(getErrorMessage(err));
    } finally {
      setIsClientSubmitting(false);
    }
  };

  const handleDeleteClient = async () => {
    if (
      !selectedClientId ||
      !window.confirm("Delete this client logo? This cannot be undone.")
    )
      return;
    setIsClientSubmitting(true);
    setClientError(null);
    setClientFeedback(null);
    try {
      await deleteClient(selectedClientId);
      const remaining = clients.filter((item) => item._id !== selectedClientId);
      setClients(remaining);
      if (remaining.length) {
        setSelectedClientId(remaining[0]._id);
        setClientDraft(toClientDraft(remaining[0]));
      } else {
        handleStartNewClient();
      }
      setClientFeedback("Client deleted successfully.");
    } catch (err) {
      setClientError(getErrorMessage(err));
    } finally {
      setIsClientSubmitting(false);
    }
  };

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminShell user={user}>
      <div className="space-y-6">
        {/* Page Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Client Relations &amp; Partnerships
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Clients Page &amp; Partnerships
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground max-w-3xl">
              Manage the public <strong>/clients</strong> page: headlines, descriptions, Partnerships marquee, Engagement Models, Domain Expertise, and client partner logos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/clients"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>View Live /clients</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "content"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-white hover:bg-white/[0.02]"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Page Content &amp; Sections</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("logos")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "logos"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-white hover:bg-white/[0.02]"
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Client &amp; Partner Logos ({clients.length})</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: FULL PAGE CONTENT & SECTIONS                           */}
        {/* ============================================================== */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {contentError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {contentError}
              </div>
            )}

            {contentFeedback && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                {contentFeedback}
              </div>
            )}

            {isContentLoading ? (
              <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <form onSubmit={handleSavePageContent} className="space-y-8">
                {/* 1. HERO SECTION */}
                <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Section 1
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      Hero Banner (&ldquo;Our Clients&rdquo;)
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Main header, title, and description displayed at the top of the /clients page.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Eyebrow Label
                      </label>
                      <Input
                        value={pageContent.hero.eyebrow}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, eyebrow: e.target.value },
                          }))
                        }
                        placeholder="e.g. Our Clients"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Hero Title / Headliner *
                      </label>
                      <Input
                        value={pageContent.hero.title}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, title: e.target.value },
                          }))
                        }
                        placeholder="e.g. Trusted by Innovative Companies Worldwide"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Hero Description *
                      </label>
                      <Textarea
                        rows={3}
                        value={pageContent.hero.description}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, description: e.target.value },
                          }))
                        }
                        placeholder="We partner with startups, growing brands, and established enterprises..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. PARTNERSHIPS & MARQUEE SECTION */}
                <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Section 2
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      Partnerships &amp; Marquee Header
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Headlines and stats pill displayed above the animated client logos marquee.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Eyebrow
                      </label>
                      <Input
                        value={pageContent.partnerships.eyebrow}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            partnerships: {
                              ...prev.partnerships,
                              eyebrow: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Partnerships"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Title
                      </label>
                      <Input
                        value={pageContent.partnerships.title}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            partnerships: {
                              ...prev.partnerships,
                              title: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Global Footprint"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Marquee Subheading / Stats Pill
                      </label>
                      <Input
                        value={pageContent.partnerships.subheading}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            partnerships: {
                              ...prev.partnerships,
                              subheading: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Trusted by 100K+ Clients Worldwide"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Description
                      </label>
                      <Input
                        value={pageContent.partnerships.description}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            partnerships: {
                              ...prev.partnerships,
                              description: e.target.value,
                            },
                          }))
                        }
                        placeholder="Our engineering solutions power organizations across diverse sectors..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. ENGAGEMENT MODELS (COLLABORATION MODELS) */}
                <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        Section 3
                      </span>
                      <h2 className="text-xl font-bold text-white mt-1">
                        ENGAGEMENT MODELS (Collaboration Models)
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Manage section headers and the flexible collaboration cards with custom Lucide icons.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddModel}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Model
                    </Button>
                  </div>

                  {/* Section Title & Description */}
                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Eyebrow
                      </label>
                      <Input
                        value={pageContent.engagementModels.eyebrow}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            engagementModels: {
                              ...prev.engagementModels,
                              eyebrow: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. ENGAGEMENT MODELS"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Title
                      </label>
                      <Input
                        value={pageContent.engagementModels.title}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            engagementModels: {
                              ...prev.engagementModels,
                              title: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Flexible Ways We Work Together"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Description
                      </label>
                      <Textarea
                        rows={2}
                        value={pageContent.engagementModels.description}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            engagementModels: {
                              ...prev.engagementModels,
                              description: e.target.value,
                            },
                          }))
                        }
                        placeholder="Every organization has unique operational workflows..."
                        required
                      />
                    </div>
                  </div>

                  {/* Dynamic Models Cards */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                      Engagement Model Cards ({pageContent.engagementModels.models.length})
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {pageContent.engagementModels.models.map((model, index) => {
                        const Icon = getIcon(model.icon || "Users");
                        return (
                          <div
                            key={index}
                            className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4 relative group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-primary">
                                Model #{index + 1}
                              </span>
                              {pageContent.engagementModels.models.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveModel(index)}
                                  className="text-red-400 hover:text-red-300 p-1 rounded"
                                  title="Remove model"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-[#0ea5e9]">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                                  Lucide Icon
                                </label>
                                <IconPicker
                                  value={model.icon}
                                  onChange={(iconName) =>
                                    handleUpdateModel(index, "icon", iconName)
                                  }
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                                Model Title *
                              </label>
                              <Input
                                value={model.title}
                                onChange={(e) =>
                                  handleUpdateModel(index, "title", e.target.value)
                                }
                                placeholder="e.g. Dedicated Engineering Teams"
                                required
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                                Model Description *
                              </label>
                              <Textarea
                                rows={3}
                                value={model.description}
                                onChange={(e) =>
                                  handleUpdateModel(index, "description", e.target.value)
                                }
                                placeholder="Details about this collaboration model..."
                                required
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. DOMAIN EXPERTISE / INDUSTRIES */}
                <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        Section 4
                      </span>
                      <h2 className="text-xl font-bold text-white mt-1">
                        DOMAIN EXPERTISE (Industries We Transform)
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Manage the industry domains and transformation cards displayed on the /clients page.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddIndustry}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Industry
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Eyebrow
                      </label>
                      <Input
                        value={pageContent.domainExpertise.eyebrow}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            domainExpertise: {
                              ...prev.domainExpertise,
                              eyebrow: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. DOMAIN EXPERTISE"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Title
                      </label>
                      <Input
                        value={pageContent.domainExpertise.title}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            domainExpertise: {
                              ...prev.domainExpertise,
                              title: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Industries We Transform"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Description
                      </label>
                      <Textarea
                        rows={2}
                        value={pageContent.domainExpertise.description}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            domainExpertise: {
                              ...prev.domainExpertise,
                              description: e.target.value,
                            },
                          }))
                        }
                        placeholder="Our engineering teams bring deep technical knowledge..."
                        required
                      />
                    </div>
                  </div>

                  {/* Industries list */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pageContent.domainExpertise.industries.map(
                      (industry, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 relative"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-primary">
                              Industry #{index + 1}
                            </span>
                            {pageContent.domainExpertise.industries.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveIndustry(index)}
                                className="text-red-400 hover:text-red-300 p-1 rounded"
                                title="Remove industry"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                              Industry Title *
                            </label>
                            <Input
                              value={industry.title}
                              onChange={(e) =>
                                handleUpdateIndustry(index, "title", e.target.value)
                              }
                              placeholder="e.g. Healthcare & Life Sciences"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                              Description *
                            </label>
                            <Textarea
                              rows={3}
                              value={industry.description}
                              onChange={(e) =>
                                handleUpdateIndustry(index, "description", e.target.value)
                              }
                              placeholder="HIPAA-compliant hospital management..."
                              required
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* 5. TRUST & SECURITY */}
                <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Section 5
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      TRUST &amp; SECURITY (Client Commitments &amp; Case Studies Card)
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Configure confidentiality standards, IP guarantees, and the case studies CTA banner.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Eyebrow
                      </label>
                      <Input
                        value={pageContent.trustAndSecurity.eyebrow}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            trustAndSecurity: {
                              ...prev.trustAndSecurity,
                              eyebrow: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. TRUST & SECURITY"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Title
                      </label>
                      <Input
                        value={pageContent.trustAndSecurity.title}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            trustAndSecurity: {
                              ...prev.trustAndSecurity,
                              title: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g. Our Commitment to Every Client Partner"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Section Description
                      </label>
                      <Textarea
                        rows={2}
                        value={pageContent.trustAndSecurity.description}
                        onChange={(e) =>
                          setPageContent((prev) => ({
                            ...prev,
                            trustAndSecurity: {
                              ...prev.trustAndSecurity,
                              description: e.target.value,
                            },
                          }))
                        }
                        placeholder="Building long-term client relationships requires more than clean code..."
                        required
                      />
                    </div>
                  </div>

                  {/* Standards Checklist */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Client Partnership Commitments &amp; Standards
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Bullet points detailing IP ownership, NDAs, sprint demos, and code reviews.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddStandard}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Standard
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {pageContent.trustAndSecurity.standards.map(
                        (std, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            <Input
                              value={std}
                              onChange={(e) =>
                                handleUpdateStandard(index, e.target.value)
                              }
                              placeholder={`Standard #${index + 1}`}
                              required
                            />
                            {pageContent.trustAndSecurity.standards.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveStandard(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Case Studies / Portfolio CTA Card */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h4 className="text-sm font-bold text-white mb-4">
                      Case Studies &amp; Portfolio Card
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">
                          Card Title
                        </label>
                        <Input
                          value={pageContent.trustAndSecurity.cardTitle}
                          onChange={(e) =>
                            setPageContent((prev) => ({
                              ...prev,
                              trustAndSecurity: {
                                ...prev.trustAndSecurity,
                                cardTitle: e.target.value,
                              },
                            }))
                          }
                          placeholder="e.g. Explore Case Studies & Results"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">
                          Primary Button Text &amp; Link
                        </label>
                        <div className="flex gap-2">
                          <Input
                            value={pageContent.trustAndSecurity.caseStudiesText}
                            onChange={(e) =>
                              setPageContent((prev) => ({
                                ...prev,
                                trustAndSecurity: {
                                  ...prev.trustAndSecurity,
                                  caseStudiesText: e.target.value,
                                },
                              }))
                            }
                            placeholder="View Case Studies"
                          />
                          <Input
                            value={pageContent.trustAndSecurity.caseStudiesLink}
                            onChange={(e) =>
                              setPageContent((prev) => ({
                                ...prev,
                                trustAndSecurity: {
                                  ...prev.trustAndSecurity,
                                  caseStudiesLink: e.target.value,
                                },
                              }))
                            }
                            placeholder="/case-studies"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">
                          Card Description
                        </label>
                        <Textarea
                          rows={2}
                          value={pageContent.trustAndSecurity.cardDescription}
                          onChange={(e) =>
                            setPageContent((prev) => ({
                              ...prev,
                              trustAndSecurity: {
                                ...prev.trustAndSecurity,
                                cardDescription: e.target.value,
                              },
                            }))
                          }
                          placeholder="Review real-world architectures and measurable outcomes..."
                          required
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">
                          Secondary Button Text &amp; Link
                        </label>
                        <div className="flex gap-2">
                          <Input
                            value={pageContent.trustAndSecurity.portfolioText}
                            onChange={(e) =>
                              setPageContent((prev) => ({
                                ...prev,
                                trustAndSecurity: {
                                  ...prev.trustAndSecurity,
                                  portfolioText: e.target.value,
                                },
                              }))
                            }
                            placeholder="Browse Portfolio"
                          />
                          <Input
                            value={pageContent.trustAndSecurity.portfolioLink}
                            onChange={(e) =>
                              setPageContent((prev) => ({
                                ...prev,
                                trustAndSecurity: {
                                  ...prev.trustAndSecurity,
                                  portfolioLink: e.target.value,
                                },
                              }))
                            }
                            placeholder="/portfolio"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Action Bar at Bottom */}
                <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-card/95 p-4 shadow-2xl backdrop-blur-md">
                  <p className="text-xs text-muted-foreground">
                    Changes will reflect immediately on the live <strong>/clients</strong> page upon saving.
                  </p>
                  <Button
                    type="submit"
                    disabled={isContentSaving}
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                  >
                    {isContentSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Page Content
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CLIENT & PARTNER LOGOS CRUD                             */}
        {/* ============================================================== */}
        {activeTab === "logos" && (
          <div className="space-y-6">
            {clientError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {clientError}
              </div>
            )}

            {clientFeedback && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                {clientFeedback}
              </div>
            )}

            {isClientsLoading ? (
              <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
                {/* Sidebar list of clients */}
                <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Client Logos</h2>
                      <p className="text-xs text-muted-foreground">
                        {clients.length} saved
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleStartNewClient}
                      aria-label="Create new client"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {clients.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                      No clients exist yet. Click + to add your first client partner.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                      {clients.map((item) => (
                        <button
                          key={item._id}
                          type="button"
                          onClick={() => void handleSelectClient(item._id)}
                          className={`w-full rounded-lg border p-3 text-left transition-colors ${
                            selectedClientId === item._id
                              ? "border-primary/50 bg-primary/10"
                              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-medium text-white">
                              {item.name || "Unnamed client"}
                            </p>
                            <span
                              className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                item.status === "active"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-zinc-500/20 text-zinc-400"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </aside>

                {/* Form to edit / create logo */}
                <form
                  onSubmit={handleSubmitClient}
                  className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7"
                >
                  <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {selectedClientId ? "Edit Client Logo" : "Add New Client"}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Manage client partner brand name, uploaded logo image, and publication status in the marquee.
                      </p>
                    </div>

                    {selectedClientId && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => void handleDeleteClient()}
                        disabled={isClientSubmitting}
                        className="w-fit text-red-300 hover:bg-red-400/10 hover:text-red-200"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Client
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Client / Company Name *
                      </label>
                      <Input
                        value={clientDraft.name}
                        onChange={(e) =>
                          setClientDraft((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Nexus, Lumina, Orbit Tech"
                        required
                      />
                    </div>

                    <div>
                      <ImageUploadField
                        publicId={clientDraft.logo.public_id}
                        url={clientDraft.logo.url}
                        onChange={(publicId, url) =>
                          setClientDraft((p) => ({
                            ...p,
                            logo: { public_id: publicId, url },
                          }))
                        }
                        label="Client Logo Image"
                      />
                      <div className="mt-2">
                        <label className="text-xs text-muted-foreground block mb-1">
                          Or enter direct image URL:
                        </label>
                        <Input
                          type="url"
                          value={clientDraft.logo.url}
                          onChange={(e) =>
                            setClientDraft((p) => ({
                              ...p,
                              logo: { ...p.logo, url: e.target.value },
                            }))
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                        Publication Status
                      </label>
                      <select
                        value={clientDraft.status}
                        onChange={(e) =>
                          setClientDraft((p) => ({
                            ...p,
                            status: e.target.value as "active" | "inactive",
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                      >
                        <option value="active" className="bg-slate-900 text-white">
                          Active (Visible in Marquee)
                        </option>
                        <option value="inactive" className="bg-slate-900 text-white">
                          Inactive (Hidden)
                        </option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleStartNewClient}
                        disabled={isClientSubmitting}
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="submit"
                        disabled={isClientSubmitting}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        {isClientSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )}
                        {selectedClientId ? "Save Changes" : "Create Client"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
