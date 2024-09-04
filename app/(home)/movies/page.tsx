"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicSwiper from "@/app/components/TopicSwiper";
import Topic from "@/app/components/Topic";
import { endpoints } from "@/app/utils/endpoints";

export default function Movies() {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <TopicSwiper
        topicName="Trending"
        apiUrl={endpoints.trendingMovies}
        mediaType="movie"
      />
      <Topic
        topicName="Popular"
        apiUrl={endpoints.popularMovies}
        mediaType="movie"
      />
    </main>
  );
}
