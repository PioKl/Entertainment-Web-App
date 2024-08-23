"use client";
import styles from "../styles/page.module.scss";
import Search from "../components/Search";
import Trending from "../components/Trending";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      <Trending />
    </main>
  );
}
