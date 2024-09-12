"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicResults from "@/app/components/TopicResults";

const TvPopularResult = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="tv" />
      <TopicResults params={params} topicType="tvPopular" />
    </main>
  );
};

export default TvPopularResult;
