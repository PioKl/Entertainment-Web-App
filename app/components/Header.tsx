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
        <Link href="/">
          <LogoIcon className={styles["nav__logo"]} />
        </Link>
        <ul className={styles["nav__links-item-list"]}>
          <li className={styles["nav__links-item"]}>
            <Link href="/">
              <HomeIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/">
              <MoviesIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/pages/movies">
              <TvIcon className={styles["nav-icon"]} />
            </Link>
          </li>
          <li className={styles["nav__links-item"]}>
            <Link href="/">
              <BookmarkIcon className={styles["nav-icon"]} />
            </Link>
          </li>
        </ul>
        <Link href="/pages/account/login">
          <Image
            src={AvatarImage}
            alt="Avatar"
            width={24}
            height={24}
            priority
            className={styles["nav__image"]}
          />
        </Link>
      </nav>
    </header>
  );
}
