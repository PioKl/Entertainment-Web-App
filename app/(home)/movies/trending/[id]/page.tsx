"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicResults from "@/app/components/TopicResults";

const MoviesTrendingResult = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <TopicResults params={params} topicType="movieTrending" />
    </main>
  );
};

export default MoviesTrendingResult;
