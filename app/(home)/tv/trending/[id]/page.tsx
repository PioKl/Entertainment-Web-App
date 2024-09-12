"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicResults from "@/app/components/TopicResults";

const TvTrendingResult = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="tv" />
      <TopicResults params={params} topicType="tvTrending" />
    </main>
  );
};

export default TvTrendingResult;
