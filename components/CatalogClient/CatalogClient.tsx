"use client";

import css from "./CatalogClient.module.css";
import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPsychologists } from "@/lib/api/psychologists";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import EmptyState from "../EmptyState/EmptyState";
import Button from "../Button/Button";
import { useAuthStore } from "@/lib/store/authStore";

import { DEFAULT_FILTER, type FilterValue } from "@/types/constants";
const PAGE_SIZE = 3;

export default function CatalogClient() {
  const [filter, setFilter] = useState<FilterValue>(DEFAULT_FILTER);
  const isAuthLoading = useAuthStore((s) => s.isLoading);

  const reset = () => setFilter(DEFAULT_FILTER);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["psychologists", filter],
    queryFn: ({ pageParam }) =>
      getAllPsychologists({ filter, page: pageParam, perPage: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination }) =>
      pagination.hasNextPage ? pagination.page + 1 : undefined,
    retry: 1,
  });

  const psychologists = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  return (
    <div className={css.catalogWrapper}>
      <FilterPanel value={filter} onChange={setFilter} />

      <div className={css.catalog}>
        {(isPending || isAuthLoading) && (
          <div className={css.globalLoaderOverlay}>
            <div className={css.loaderWrapper} role="status">
              <Loader />
              <span>Loading psychologists...</span>
              <p className={css.loaderText}>
                Please wait while we find the best specialists for you
              </p>
            </div>
          </div>
        )}

        {isError && psychologists.length === 0 && (
          <div className={css.errorText}>
            <ErrorMessage
              message="Could not load psychologists."
              onRetry={() => refetch()}
            />
          </div>
        )}
        {isError && psychologists.length > 0 && (
          <ErrorMessage
            message="Could not load more psychologists."
            onRetry={() => fetchNextPage()}
          />
        )}
        {!isPending && !isError && psychologists.length === 0 && (
          <EmptyState onReset={reset} />
        )}
        {!isAuthLoading && psychologists.length > 0 && (
          <ul className={css.list}>
            {psychologists.map((psychologist) => (
              <PsychologistCard
                key={psychologist.id}
                psychologist={psychologist}
              />
            ))}
          </ul>
        )}

        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={css.loadMoreBtn}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>
    </div>
  );
}
