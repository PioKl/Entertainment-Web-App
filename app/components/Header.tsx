"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from "../images/logo.svg";
import HomeIcon from "../images/icon-nav-home.svg";
import MoviesIcon from "../images/icon-nav-movies.svg";
import TvIcon from "../images/icon-nav-tv-series.svg";
import BookmarkIcon from "../images/icon-nav-bookmark.svg";
import AvatarImage from "../images/image-avatar.png";
import LogoutIcon from "../images/icon-logout.svg";

import styles from "../styles/header.module.scss";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    /* !! 
    null, undefined, 0, '' (pusty string), NaN, false → wynik to false
    jakakolwiek inna wartość (np. string, liczba różna od zera, obiekt, tablica) → wynik to true
    */
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Usuń token z localStorage
    setIsLoggedIn(false); // Ustaw stan na wylogowany
    router.push("/login"); // Przekieruj do strony logowania
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}`}>
        <Link href="/" className={styles["nav__home-link"]}>
          <LogoIcon className={styles["nav__logo"]} />
        </Link>
        <ul className={styles["nav__links-item-list"]}>
          <li className={styles["nav__links-item"]}>
            <Link href="/">
              <HomeIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/movies">
              <MoviesIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/tv">
              <TvIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/bookmarked">
              <BookmarkIcon className={styles["nav-icon"]} />
            </Link>
          </li>
        </ul>
        <div className={styles["nav__account"]}>
          <Link
            href="/login"
            className={styles["nav__login-link"]}
            style={{
              position: "relative",
              width: "clamp(2.4rem, 1.584rem + 2.177vw, 4rem)",
              height: "clamp(2.4rem, 1.584rem + 2.177vw, 4rem)",
            }}
          >
            <Image
              src={AvatarImage}
              alt="Avatar"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={true}
              className={styles["nav__avatar-image"]}
            />
          </Link>
          {isLoggedIn && (
            <LogoutIcon
              onClick={handleLogout}
              className={styles["nav__logout-icon"]}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
