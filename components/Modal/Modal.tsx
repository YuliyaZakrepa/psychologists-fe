"use client";
import { useCallback, useEffect, useRef } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Icon from "../Icon/Icon";

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ onClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };
  useEffect(() => {
    previousActiveElementRef.current = document.activeElement as HTMLElement;
    const modal = modalRef.current;
    if (!modal) return;
    const firstFocusableElement = modal.querySelector<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    firstFocusableElement?.focus();

    return () => {
      previousActiveElementRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      if (e.key === "Tab") {
        const modal = modalRef.current;
        const focusable = Array.from(
          modal?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) ?? []
        );
        const activeIndex = focusable.indexOf(
          document.activeElement as HTMLElement
        );
        const target = e.shiftKey
          ? activeIndex <= 0
            ? focusable.at(-1)
            : null
          : activeIndex < 0 || activeIndex === focusable.length - 1
            ? focusable[0]
            : null;
        if (target || focusable.length === 0) {
          e.preventDefault();
          target?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleClose]);
  if (typeof document === "undefined") {
    return null;
  }
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div ref={modalRef} className={`${css.modal} ${className ?? ""}`}>
        <button
          className={css.closeButton}
          onClick={handleClose}
          aria-label="Close form"
        >
          <Icon className={css.icon} size={32} name={"icon-x"}></Icon>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
