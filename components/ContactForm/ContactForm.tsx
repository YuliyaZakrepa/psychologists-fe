"use client";
import { TIME_SLOTS } from "@/types/constants";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "../Button/Button";
import { Psychologist } from "@/types/psychologist";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./ContactForm.module.css";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Enter phone in format +380XXXXXXXXX")
    .required("Phone is required"),
  time: yup.string().required("Choose meeting time"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  comment: yup
    .string()
    .trim()
    .min(5, "Comment must be at least 5 characters")
    .required("Comment is required"),
});

type FormValues = yup.InferType<typeof schema>;

interface ContactFormProps {
  psychologist: Psychologist;
  onSuccess?: () => void;
}

export default function ContactForm({
  psychologist,
  onSuccess,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "+380",
      time: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log({ psychologistId: psychologist.id, ...values });

      toast.success("Your appointment request has been sent");
      reset();
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Make an appointment with a psychologists</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={css.doctor}>
        <Image
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
          width={44}
          height={44}
        />
        <div>
          <p className={css.doctorLabel}>Your psychologists</p>
          <p className={css.doctorName}>{psychologist.name}</p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.field}>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

        <div className={css.row}>
          <div className={css.field}>
            <input
              className={css.input}
              type="tel"
              placeholder="+380"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>

          <div className={css.field}>
            <select
              className={css.input}
              aria-invalid={!!errors.time}
              {...register("time")}
            >
              <option value=""> Meeting time</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && <p className={css.error}>{errors.time.message}</p>}
          </div>
        </div>

        <div className={css.field}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.field}>
          <textarea
            className={`${css.input} ${css.textarea}`}
            placeholder="Comment"
            aria-invalid={!!errors.comment}
            {...register("comment")}
          />
          {errors.comment && (
            <p className={css.error}>{errors.comment.message}</p>
          )}
        </div>

        <Button className={css.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
