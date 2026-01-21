"use client";

import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import GenreFilter from "@/app/components/GenreFilter";
import GenreFilterResults from "@/app/components/GenreFilterResults";

type MoviesPageParams = {
  id: string;
};

interface MoviesGenreResultProps {
  params: MoviesPageParams;
}

export default function MoviesGenreResult({ params }: MoviesGenreResultProps) {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <GenreFilter filterType="movie" />
      <GenreFilterResults params={params} filterType="movie" />
    </main>
  );
}
