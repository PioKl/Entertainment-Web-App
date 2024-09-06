"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import GenreFilter from "@/app/components/GenreFilter";
import GenreFilterResults from "@/app/components/GenreFilterResults";

const TvGenreResult = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="tv" />
      <GenreFilter filterType="tv" />
      <GenreFilterResults params={params} filterType="tv" />
    </main>
  );
};
export default TvGenreResult;
