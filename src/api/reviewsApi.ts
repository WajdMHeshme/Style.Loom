// src/api/reviewsApi.ts
import api, { setAuthToken } from "./axios";
import type { RawReview } from "../redux/slices/reviewsSlice";

export const fetchReviewsApi = async (): Promise<RawReview[]> => {
  const res = await api.get<RawReview[]>("/dashboard/webReview");
  return res.data;
};

export const postReviewApi = async (payload: Partial<RawReview>, token?: string | null): Promise<RawReview> => {
  // set token temporarily on axios instance
  setAuthToken(token ?? null);
  try {
    const res = await api.post<RawReview>("/webSit", payload);
    return res.data;
  } finally {
    // remove token after request
    setAuthToken(null);
  }
};
