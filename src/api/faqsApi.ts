// src/api/faqsApi.ts
import api, { setAuthToken } from "./axios";
import type { RawFaq } from "../redux/slices/faqSlice";

export const fetchFaqsApi = async (): Promise<RawFaq[]> => {
  // api (axios) already يحتوي على baseURL من VITE_API_BASE
  const res = await api.get<RawFaq[]>("/dashboard/faq");
  return res.data;
};

// optional helper used by the thunk (keeps symmetry with your pattern)
export const withToken = (token?: string | null) => {
  setAuthToken(token ?? null);
};
