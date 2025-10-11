import api from "./axios";
import type { RawProduct } from "../redux/slices/productsSlice";

export const fetchProductsApi = async (): Promise<RawProduct[]> => {
    const res = await api.get<RawProduct[]>("/product");
    return res.data;
};