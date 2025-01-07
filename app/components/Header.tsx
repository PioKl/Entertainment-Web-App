"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from "../images/logo.svg";
import HomeIcon from "../images/icon-nav-home.svg";
import MoviesIcon from "../images/icon-nav-movies.svg";
import TvIcon from "../images/icon-nav-tv-series.svg";
import BookmarkIcon from "../images/icon-nav-bookmark.svg";
import AvatarPlaceholder from "@/app/images/user.svg";
import LogoutIcon from "../images/icon-logout.svg";

import styles from "../styles/header.module.scss";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProfilePic, setCurrentProfilePic] = useState<string | null>(
    null
  ); // URL zdjęcia profilowego

  useEffect(() => {
    const token = localStorage.getItem("token");
    /* !! 
    null, undefined, 0, '' (pusty string), NaN, false → wynik to false
    jakakolwiek inna wartość (np. string, liczba różna od zera, obiekt, tablica) → wynik to true
    */
    setIsLoggedIn(!!token);
    token && fetchProfilePic(token); // Pobranie aktualnego zdjęcia profilowego
  }, []);

  const fetchProfilePic = async (token: string) => {
    try {
      const response = await apiClient.get("/api/profile/profile-pic", {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token JWT do nagłówka
        },
        responseType: "blob", // Pobierz dane jako blob
      });

      const imageUrl = URL.createObjectURL(response.data); // Konwersja blobu na URL
      setCurrentProfilePic(imageUrl);
    } catch (error) {
      console.error("Error while downloading profile picture:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Usuń token z localStorage
    setIsLoggedIn(false); // Ustaw stan na wylogowany
    router.push("/login"); // Przekieruj do strony logowania
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav}`}>
        <Link href="/" className={styles["nav__home-link"]}>
          <LogoIcon className={styles["nav__logo"]} title="home" />
        </Link>
        <ul className={styles["nav__links-item-list"]}>
          <li className={styles["nav__links-item"]}>
            <Link href="/" title="home">
              <HomeIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/movies" title="movies">
              <MoviesIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/tv" title="tv">
              <TvIcon className={styles["nav-icon"]} />
            </Link>
          </li>

          <li className={styles["nav__links-item"]}>
            <Link
              href={isLoggedIn ? "/bookmarked" : "/login"}
              title="bookmarked"
            >
              <BookmarkIcon className={styles["nav-icon"]} />
            </Link>
          </li>
        </ul>
        <div className={styles["nav__account"]}>
          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            className={`${styles["nav__login-link"]} ${
              currentProfilePic && styles["--avatar-loaded"]
            }`}
            style={{
              position: "relative",
              width: "clamp(2.4rem, 1.584rem + 2.177vw, 4rem)",
              height: "clamp(2.4rem, 1.584rem + 2.177vw, 4rem)",
            }}
            title={isLoggedIn ? "profile" : "login"}
          >
            {currentProfilePic ? (
              <Image
                src={currentProfilePic}
                alt="Avatar"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
                priority={true}
                className={styles["nav__avatar-image"]}
              />
            ) : (
              <AvatarPlaceholder
                className={styles["nav__avatar-placeholder"]}
              />
            )}
          </Link>
          {isLoggedIn && (
            <button
              className={styles["nav__logout-button"]}
              title="logout"
              onClick={handleLogout}
            >
              <LogoutIcon className={styles["nav__logout-icon"]} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
