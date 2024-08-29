import Link from "next/link";
import Image from "next/image";
import LogoIcon from "../images/logo.svg";
import HomeIcon from "../images/icon-nav-home.svg";
import MoviesIcon from "../images/icon-nav-movies.svg";
import TvIcon from "../images/icon-nav-tv-series.svg";
import BookmarkIcon from "../images/icon-nav-bookmark.svg";
import AvatarImage from "../images/image-avatar.png";

import styles from "../styles/header.module.scss";

export default function Header() {
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
      </nav>
    </header>
  );
}
