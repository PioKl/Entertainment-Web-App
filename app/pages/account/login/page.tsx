"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/login.module.scss";

export default function Login() {
  //const [emptyForm, setEmptyFrom] = useState(true);

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
      <div className={styles.login}>
        <h2 className={styles["login__heading"]}>Login</h2>
        <form onSubmit={handleSubmit} className={styles["login__form"]}>
          <div className={styles["login__inputs-container"]}>
            <label htmlFor="email" className={styles["login__label"]}>
              <input
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className={styles["login__input"]}
                id="email"
                type="email"
                placeholder="Email address"
                autoComplete="username"
              />
              {errors.email && (
                <span className={styles["login__error"]}>
                  {messages.errorMessage}
                </span>
              )}
            </label>
            <label className={styles["login__label"]}>
              <input
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className={styles["login__input"]}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && (
                <span className={styles["login__error"]}>
                  {messages.errorMessage}
                </span>
              )}
            </label>
          </div>

          <button type="submit" className={styles["login__button"]}>
            Login to your account
          </button>
          <p>
            Don’t have an account?{" "}
            <Link href="/" className={styles["login__link"]}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
