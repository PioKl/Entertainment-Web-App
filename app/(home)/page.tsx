"use client";
import styles from "../styles/page.module.scss";
import Search from "../components/Search";
import Trending from "../components/Trending";
import Popular from "../components/Popular";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      <Trending />
      <Popular />
    </main>
  );
}
