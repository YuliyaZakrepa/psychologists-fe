export const FILTERS = [
  { value: "a_to_z", label: "A to Z" },
  { value: "z_to_a", label: "Z to A" },
  { value: "less_than_100", label: "Less than 100$" },
  { value: "greater_than_100", label: "Greater than 100$" },
  { value: "popular", label: "Popular" },
  { value: "not_popular", label: "Not popular" },
  { value: "show_all", label: "Show all" },
] as const;

export type FilterValue = (typeof FILTERS)[number]["value"];
export const DEFAULT_FILTER: FilterValue = "a_to_z";

export const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const hours = String(9 + Math.floor(i / 2)).padStart(2, "09");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});
