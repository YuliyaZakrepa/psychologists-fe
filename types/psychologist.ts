import { Review } from "./review";
import type { FilterValue } from "@/components/FilterPanel/FilterPanel";
export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews?: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
  isFavorite: boolean;
}
export interface Pagination {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
}
export interface PsychologistsResponse {
  status: number;
  data: Psychologist[];
  pagination: Pagination;
}

export interface PsychologistByIdResponse {
  status: number;
  data: Psychologist;
}

export interface PsychologistsQueryParams {
  page?: number;
  filter?: FilterValue;
  perPage?: number;
}
