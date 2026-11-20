"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { registerUser } from "@/lib/api/auth";
import type { RegisterRequest } from "@/types/auth";
import Icon from "../Icon/Icon";
import css from "./RegisterForm.module.css";

const REQUIRED = "This field is required";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required(REQUIRED)
    .min(3, "Minimum 2 characters")
    .max(32, "Maximum 32 characters"),
  email: yup.string().trim().required(REQUIRED).email("Invalid email"),
  password: yup
    .string()
    .required(REQUIRED)
    .min(8, "Minimum 8 characters")
    .max(64, "Maximum 64 characters"),
});

type Props = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: RegisterRequest) => {
    setServerError("");
    try {
      await registerUser(values);
      toast.success("Registration successful!");

      if (onSuccess) {
        onSuccess();
      } else {
        router.back();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (error.response?.status === 400 && message === "Email in use") {
          setServerError("This email is already registered");
        } else {
          setServerError(message ?? "Something went wrong");
        }
      } else {
        setServerError("Something went wrong");
      }
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.field}>
        <input
          className={`${css.input} ${errors.name ? css.inputError : ""}`}
          type="text"
          placeholder="Name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.field}>
        <input
          className={`${css.input} ${errors.email ? css.inputError : ""}`}
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.field}>
        <input
          className={`${css.input} ${css.passwordInput} ${
            errors.password ? css.inputError : ""
          }`}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        <button
          className={css.eyeButton}
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon
            className={css.eyeIcon}
            name={showPassword ? "icon-eye" : "icon-eye-off"}
            size={20}
          />
        </button>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={css.submitWrap}>
        <button className={css.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
        {serverError && <p className={css.error}>{serverError}</p>}
      </div>
    </form>
  );
}
