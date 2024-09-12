"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicResults from "@/app/components/TopicResults";

const MoviesPopularResult = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <TopicResults params={params} topicType="moviePopular" />
    </main>
  );
};

export default MoviesPopularResult;
