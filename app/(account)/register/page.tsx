"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/auth.module.scss";

export default function Register() {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    passwordComprasion: false,
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    passwordComprasion: "",
  });

  const messages = {
    errorMessage: "Can’t be empty",
    wrongRepeatPassword: "Password is different",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values.email);

    const newErrors = {
      email: values.email === "",
      password: values.password === "",
      repeatPassword: values.repeatPassword === "",
      passwordComprasion: values.password !== values.repeatPassword,
    };

    // Ustawienie błędów w postaci true i false
    if (
      newErrors.email ||
      newErrors.password ||
      newErrors.repeatPassword ||
      newErrors.passwordComprasion
    ) {
      setErrors(newErrors);
    }
    //Jeśli nie ma błędów, będzie wysłany endpoint
    else {
      setErrors({
        email: false,
        password: false,
        repeatPassword: false,
        passwordComprasion: false,
      });
      setValues({
        email: "",
        password: "",
        repeatPassword: "",
        passwordComprasion: "",
      });
      console.log("Send");
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
              {(errors.repeatPassword || errors.passwordComprasion) && (
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
