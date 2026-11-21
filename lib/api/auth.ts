import { api } from "./api";
import type { RegisterRequest, LoginRequest } from "@/types/auth";

export async function registerUser(payload: RegisterRequest) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}
export async function loginUser(payload: LoginRequest) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}
export async function checkSession() {
  const { data } = await api.get<{ success: boolean }>("/auth/session");
  return data.success;
}

export async function logoutUser() {
  await api.post("/auth/logout");
}
