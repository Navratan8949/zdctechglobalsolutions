"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/upload.service";

export function ImageUploadField({
  publicId,
  url,
  onChange,
  label = "Upload Image",
}: {
  publicId: string;
  url: string;
  onChange: (publicId: string, url: string) => void;
  label?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadFile(file);
      if (response.success && response.data) {
        onChange(response.data.public_id, response.data.url);
      } else {
        setError(response.message || "Failed to upload image.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const clearImage = () => {
    onChange("", "");
  };

  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-white">{label}</label>
      
      {url ? (
        <div className="relative mt-2 flex h-48 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
          <img
            src={url}
            alt="Uploaded preview"
            className="h-full w-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={clearImage}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" /> Remove Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/20 px-6 py-10 transition-colors hover:border-white/40 hover:bg-white/[0.02]">
          <div className="text-center">
            {isUploading ? (
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            ) : (
              <UploadCloud
                className="mx-auto h-12 w-12 text-white/50"
                aria-hidden="true"
              />
            )}
            <div className="mt-4 flex text-sm leading-6 text-white/70">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
              >
                <span>{isUploading ? "Uploading..." : "Upload a file"}</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  disabled={isUploading}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-white/50">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {url && (
        <p className="mt-2 text-xs text-white/50 break-all">
          <ImageIcon className="inline-block h-3 w-3 mr-1" />
          {publicId}
        </p>
      )}
    </div>
  );
}
