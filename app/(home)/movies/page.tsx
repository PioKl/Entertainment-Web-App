"use client";
import styles from "@/app/styles/page.module.scss";
import { endpoints } from "@/app/utils/endpoints";
import Search from "@/app/components/Search";
import TopicSwiper from "@/app/components/TopicSwiper";
import Topic from "@/app/components/Topic";
import GenreFilter from "@/app/components/GenreFilter";

export default function Movies() {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <GenreFilter filterType="movie" />
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
