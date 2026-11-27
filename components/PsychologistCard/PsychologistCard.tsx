"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";
import Icon from "@/components/Icon/Icon";
import type { Psychologist } from "@/types/psychologist";
import css from "./PsychologistCard.module.css";
import { useState } from "react";

interface PsychologistCardProps {
  psychologist: Psychologist;
  className?: string;
  children?: React.ReactNode;
}
const readIds = (storageKey: string): string[] => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "[]");
  } catch {
    return [];
  }
};

export default function PsychologistCard({
  psychologist,
  className,
  children,
}: PsychologistCardProps) {
  const {
    id,
    name,
    avatar_url,
    experience,
    license,
    specialization,
    initial_consultation,
    about,
    rating,
    price_per_hour,
  } = psychologist;

  const user = useAuthStore((s) => s.user);
  const key = user ? `favorites_${user.id}` : null;

  const [isFavorite, setIsFavorite] = useState(() =>
    key ? readIds(key).includes(id) : false
  );

  const handleHeartClick = () => {
    if (!key) {
      toast.error("This feature is available only for authorized users");
      return;
    }

    const ids = readIds(key);
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];

    localStorage.setItem(key, JSON.stringify(next));
    setIsFavorite(next.includes(id));
  };
  return (
    <motion.li className={`${css.card} ${className ?? ""}`}>
      <div className={css.avatarWrap}>
        <Image
          className={css.avatar}
          src={avatar_url}
          alt={name}
          width={96}
          height={96}
        />
        <span className={css.onlineDot} aria-hidden="true" />
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <p className={css.role}>Psychologist</p>

          <div className={css.meta}>
            <span className={css.rating}>
              <Icon name="icon-star" size={16} className={css.star} />
              Rating: {rating}
            </span>

            <span>
              Price / 1 hour:{" "}
              <span className={css.price}>{price_per_hour}$</span>
            </span>

            <button
              type="button"
              className={`${css.heart} ${isFavorite ? css.heartActive : ""}`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={isFavorite}
              onClick={handleHeartClick}
            >
              <Icon className={css.icon} name="icon-heart" size={26} />
            </button>
          </div>
        </div>

        <h3 className={css.name}>{name}</h3>

        <ul className={css.tags}>
          <li className={css.tagLabel}>
            Experience:<span>&nbsp;{experience}</span>
          </li>
          <li className={css.tagLabel}>
            License:<span>&nbsp;{license}</span>
          </li>
          <li className={css.tagLabel}>
            Specialization:
            <span>&nbsp;{specialization}</span>
          </li>
          <li className={css.tagLabel}>
            Initial consultation:
            <span>&nbsp;{initial_consultation}</span>
          </li>
        </ul>

        <p className={css.about}>{about}</p>

        <Link href={`/psychologists/${id}`} className={css.readMore}>
          Read more
        </Link>
        {children}
      </div>
    </motion.li>
  );
}
