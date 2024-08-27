import Link from "next/link";
import LogoIcon from "../images/tmdb-logo.svg";
import styles from "../styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__link-container"]}>
        <span>Powered by</span>
        <Link
          href="https://www.themoviedb.org/"
          target="_blank"
          className={styles["footer__tmdb-link"]}
        >
          <LogoIcon
            className={styles["footer__tmdb-logo"]}
            alt="The Movie DB"
          />
        </Link>
      </div>
    </footer>
  );
}
