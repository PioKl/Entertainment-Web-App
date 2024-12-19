"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth.module.scss";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function Register() {
  const router = useRouter();
  const [errors, setErrors] = useState({
    email: false,
    emailTaken: false,
    password: false,
    repeatPassword: false,
    passwordCompare: false,
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    passwordCompare: "",
  });

  const messages = {
    errorMessage: "Can’t be empty",
    wrongRepeatPassword: "Password is different",
    emailTaken: "Email is already taken",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors((prevErrors) => ({
      ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
      emailTaken: false,
    }));

    const newErrors = {
      email: values.email === "",
      password: values.password === "",
      repeatPassword: values.repeatPassword === "",
      passwordCompare: values.password !== values.repeatPassword,
    };

    // Ustawienie błędów w postaci true i false
    if (
      newErrors.email ||
      newErrors.password ||
      newErrors.repeatPassword ||
      newErrors.passwordCompare
    ) {
      //poniżej inne rozwiązanie zamiast setErrors(newErrors), ze względu na dodanie emailTaken do errors zamiast oddzielnie (const [emailTaken, setEmailTaken] = useState(false))
      setErrors((prevErrors) => ({
        ...prevErrors, // zachowuje poprzednie wartości
        ...newErrors, // nadpisuje nowe wartości
        emailTaken: prevErrors.emailTaken, // utrzymuje poprzednią wartość emailTaken
      }));
    }
    //Jeśli nie ma błędów, będzie wysłany endpoint
    else {
      try {
        await apiClient.post("/api/auth/register", {
          userEmail: values.email,
          password: values.password,
        });
        setValues((prevValues) => ({
          ...prevValues,
          email: "",
        }));
        router.push("/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrors((prevErrors) => ({
              ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
              emailTaken: true,
            }));
          } else {
            console.error("Unexpected error:", error);
          }
        }
      }
      setErrors((prevErrors) => ({
        ...prevErrors, // zachowuje aktualne wartości poprzednich błędów
        email: false,
        password: false,
        repeatPassword: false,
        passwordCompare: false,
      }));
      setValues((prevValues) => ({
        ...prevValues,
        password: "",
        repeatPassword: "",
        passwordCompare: "",
      }));
    }
  };
  return (
    <>
      <div className={styles.auth}>
        <h2 className={styles["auth__heading"]}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles["auth__form"]}>
          <div className={styles["auth__inputs-container"]}>
            <label htmlFor="email" className={styles["auth__label"]}>
              <input
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className={styles["auth__input"]}
                id="email"
                type="email"
                placeholder="Email address"
                autoComplete="username"
              />
              {(errors.email || errors.emailTaken) && (
                <span className={styles["auth__error"]}>
                  {errors.email && messages.errorMessage}
                  {!errors.email && errors.emailTaken && messages.emailTaken}
                </span>
              )}
            </label>
            <label className={styles["auth__label"]}>
              <input
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className={styles["auth__input"]}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className={styles["auth__error"]}>
                  {messages.errorMessage}
                </span>
              )}
            </label>
            <label className={styles["auth__label"]}>
              <input
                value={values.repeatPassword}
                onChange={(e) =>
                  setValues({ ...values, repeatPassword: e.target.value })
                }
                className={styles["auth__input"]}
                type="password"
                placeholder="Repeat Password"
                autoComplete="current-password"
              />
              {(errors.repeatPassword || errors.passwordCompare) && (
                <span className={styles["auth__error"]}>
                  {errors.repeatPassword
                    ? messages.errorMessage
                    : messages.wrongRepeatPassword}
                </span>
              )}
            </label>
          </div>

          <button type="submit" className={`btn ${styles["auth__button"]}`}>
            Create an account
          </button>
          <p>
            Already have an account?{" "}
            <Link href="/login" className={styles["auth__link"]}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
