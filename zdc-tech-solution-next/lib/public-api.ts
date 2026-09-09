export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
}

export function unwrapApiResponse<T>(response: T | ApiResponse<T>): T {
  if (response && typeof response === "object" && "data" in response) {
    const envelope = response as ApiResponse<T>;
    return envelope.data as T;
  }

  return response as T;
}

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }

  return "Live content is unavailable. Showing the latest local content instead.";
}
