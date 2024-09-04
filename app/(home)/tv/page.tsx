"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicSwiper from "@/app/components/TopicSwiper";
import Topic from "@/app/components/Topic";
import { endpoints } from "@/app/utils/endpoints";

export default function Tv() {
  return (
    <main className={styles.main}>
      <Search searchType="tv" />
      <TopicSwiper
        topicName="Trending"
        apiUrl={endpoints.trendingTv}
        mediaType="tv"
      />
      <Topic topicName="Popular" apiUrl={endpoints.popularTv} mediaType="tv" />
    </main>
  );
}
