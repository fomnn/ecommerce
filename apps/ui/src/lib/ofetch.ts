import { ofetch } from "ofetch";

export const baseURL = "https://ecommerce2.fathurrahmannotoy.workers.dev/";
// export const baseURL = import.meta.env.VITE_BACKEND_URL;

export const apiFetch = ofetch.create({ baseURL });
