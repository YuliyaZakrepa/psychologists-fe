"use client";
import { getPsychologistById } from "@/lib/api/psychologists";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./PsychologistDetailsClient.module.css";
import Icon from "../Icon/Icon";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

export default function PsychologistDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: psychologist,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["psychologist", id],
    queryFn: async () => (await getPsychologistById(id)).data,
  });
  const reviews = psychologist?.reviews ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => setIsModalOpen(true);
  const modalClose = () => setIsModalOpen(false);

  return (
    <div className={css.wrapper}>
      {isPending && (
        <div className={css.globalLoaderOverlay}>
          <div className={css.loaderWrapper} role="status">
            <Loader />
            <span>Loading...</span>
            <p className={css.loaderText}>Please wait.</p>
          </div>
        </div>
      )}

      {error && (
        <div className={css.errorText}>
          <ErrorMessage
            message="Could not load psychologist details."
            onRetry={() => refetch()}
          />
        </div>
      )}

      {psychologist && (
        <ul className={css.list}>
          <PsychologistCard
            psychologist={psychologist}
            className={css.psychologistCard}
          >
            {reviews.length > 0 && (
              <ul className={css.reviews}>
                {reviews.map((review, index) => (
                  <li key={`${review.reviewer}-${index}`}>
                    <div className={css.mainContainer}>
                      <div className={css.letter}>
                        <span aria-hidden="true">
                          {review.reviewer.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className={css.reviewerInfo}>
                        <p className={css.nameReviewer}>{review.reviewer}</p>
                        <span className={css.rating}>
                          <Icon
                            name="icon-star"
                            size={16}
                            className={css.star}
                          />
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}

            <Button
              type="button"
              className={css.contactFormBtn}
              onClick={modalOpen}
            >
              Make an appointment
            </Button>
            {isModalOpen && (
              <Modal onClose={modalClose}>
                <ContactForm
                  psychologist={psychologist}
                  onSuccess={modalClose}
                />
              </Modal>
            )}
          </PsychologistCard>
        </ul>
      )}
    </div>
  );
}
