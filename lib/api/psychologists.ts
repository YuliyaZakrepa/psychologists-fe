import { api } from "./api";
import {
  PsychologistsResponse,
  PsychologistByIdResponse,
  PsychologistsQueryParams,
} from "@/types/psychologist";

export async function getAllPsychologists(
  params?: PsychologistsQueryParams
): Promise<PsychologistsResponse> {
  const { data } = await api.get<PsychologistsResponse>("/psychologists", {
    params,
  });
  return data;
}

export async function getPsychologistById(
  id: string
): Promise<PsychologistByIdResponse> {
  const { data } = await api.get<PsychologistByIdResponse>(
    `/psychologists/${id}`
  );
  return data;
}
