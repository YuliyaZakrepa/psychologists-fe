"use client";

import { useEffect, useId, useRef, useState } from "react";
import css from "./FilterPanel.module.css";
import { FILTERS, type FilterValue } from "@/types/constants";

interface FilterPanelProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function FilterPanel({ value, onChange }: FilterPanelProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = FILTERS.find((f) => f.value === value) ?? FILTERS[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const select = (next: FilterValue) => {
    onChange(next);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={rootRef}>
      <span className={css.label} id={id}>
        Filters
      </span>

      <button
        type="button"
        className={css.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {current.label}
        <svg
          className={`${css.chevron} ${isOpen ? css.chevronOpen : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            d="M5 12l5-5 5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.list} role="listbox" aria-labelledby={id}>
          {FILTERS.map((item) => (
            <li
              key={item.value}
              role="option"
              aria-selected={item.value === value}
            >
              <button
                type="button"
                className={`${css.option} ${
                  item.value === value ? css.optionActive : ""
                }`}
                onClick={() => select(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
