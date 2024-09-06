"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import GenreFilter from "@/app/components/GenreFilter";
import GenreFilterResults from "@/app/components/GenreFilterResults";

const MoviesGenreResult = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <GenreFilter filterType="movie" />
      <GenreFilterResults params={params} filterType="movie" />
    </main>
  );
};
export default MoviesGenreResult;
