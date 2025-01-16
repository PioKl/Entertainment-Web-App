"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../styles/auth.module.scss";
import AuthContext from "@/app/contexts/AuthContext";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function Login() {
  const router = useRouter();

  const [errors, setErrors] = useState({
    emailEmpty: false,
    passwordEmpty: false,
    wrongEmailOrPassword: false,
  });

  const [values, setValues] = useState({
    emailInput: "",
    passwordInput: "",
  });

  const messages = {
    errorMessage: "Can’t be empty",
    wrongEmailOrPasswordMessage: "Wrong email or password",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      emailEmpty: values.emailInput === "",
      passwordEmpty: values.passwordInput === "",
    };

    // Ustawienie błędów w postaci true i false
    if (newErrors.emailEmpty || newErrors.passwordEmpty) {
      setErrors((prevErrors) => ({
        ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
        emailEmpty: newErrors.emailEmpty,
        passwordEmpty: newErrors.passwordEmpty,
      }));
    }
    //Jeśli nie ma błędów, będzie wysłany endpoint
    else {
      try {
        const response = await apiClient.post("/api/auth/login", {
          userEmail: values.emailInput,
          password: values.passwordInput,
        });

        localStorage.setItem("token", response.data.token); // Przechowuj token w localStorage
        setErrors((prevErrors) => ({
          ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
          wrongEmailOrPassword: false,
        }));
        router.push("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            console.log("Wrong email or password");
            setErrors((prevErrors) => ({
              ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
              wrongEmailOrPassword: true,
            }));
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }

      setErrors((prevErrors) => ({
        ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
        emailEmpty: false,
        passwordEmpty: false,
      }));

      console.log("Send");
    }
  };
  return (
    <>
      <div className={styles.auth}>
        <h2 className={styles["auth__heading"]}>Login</h2>
        <form onSubmit={handleSubmit} className={styles["auth__form"]}>
          <div className={styles["auth__inputs-container"]}>
            <label htmlFor="email" className={styles["auth__label"]}>
              <input
                value={values.emailInput}
                onChange={(e) =>
                  setValues({ ...values, emailInput: e.target.value })
                }
                className={styles["auth__input"]}
                id="email"
                type="email"
                placeholder="Email address"
                autoComplete="username"
              />
              {errors.emailEmpty && (
                <span className={styles["auth__error"]}>
                  {messages.errorMessage}
                </span>
              )}
            </label>
            <label className={styles["auth__label"]}>
              <input
                value={values.passwordInput}
                onChange={(e) =>
                  setValues({ ...values, passwordInput: e.target.value })
                }
                className={styles["auth__input"]}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.passwordEmpty && (
                <span className={styles["auth__error"]}>
                  {messages.errorMessage}
                </span>
              )}
            </label>
            {!errors.emailEmpty &&
              !errors.passwordEmpty &&
              errors.wrongEmailOrPassword && (
                <span
                  className={`${styles["auth__error"]} ${styles["--wrongEmailOrPassword"]}`}
                >
                  {messages.wrongEmailOrPasswordMessage}
                </span>
              )}
          </div>

          <button type="submit" className={`btn ${styles["auth__button"]}`}>
            Login to your account
          </button>
          <p>
            Don’t have an account?{" "}
            <Link href="/register" className={styles["auth__link"]}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
