export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
}

export function unwrapApiResponse<T>(response: T | ApiResponse<T> | null | undefined): T | undefined {
  if (!response || typeof response !== "object") {
    return (response as T) ?? undefined;
  }

  if ("success" in response && (response as ApiResponse<T>).success === false) {
    return undefined;
  }

  if ("data" in response && (response as ApiResponse<T>).data !== undefined) {
    const envelope = response as ApiResponse<T>;
    return (envelope.data as T) ?? undefined;
  }

  return (response as T) ?? undefined;
}

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }

  return "Live content is unavailable. Showing the latest local content instead.";
}
