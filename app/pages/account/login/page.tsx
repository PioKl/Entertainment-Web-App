"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/login.module.scss";

export default function Login() {
  const [emptyForm, setEmptyFrom] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={styles.login}>
        <h2 className={styles["login__heading"]}>Login</h2>
        <form onSubmit={handleSubmit} className={styles["login__form"]}>
          <div className={styles["login__inputs-container"]}>
            <label htmlFor="email" className={styles["login__label"]}>
              <input
                className={styles["login__input"]}
                pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                id="email"
                type="email"
                placeholder="Email address"
                required
              />
            </label>
            <label className={styles["login__label"]}>
              <input
                className={styles["login__input"]}
                type="password"
                placeholder="Password"
              />
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
