"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/auth.module.scss";

export default function Login() {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const messages = {
    errorMessage: "Can’t be empty",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values.email);

    const newErrors = {
      email: values.email === "",
      password: values.password === "",
    };

    // Ustawienie błędów w postaci true i false
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    }
    //Jeśli nie ma błędów, będzie wysłany endpoint
    else {
      setErrors({
        email: false,
        password: false,
      });
      setValues({
        email: "",
        password: "",
      });
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
              {errors.email && (
                <span className={styles["auth__error"]}>
                  {messages.errorMessage}
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
