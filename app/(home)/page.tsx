"use client";
import styles from "../styles/page.module.scss";
import Search from "../components/Search";
import TopicSwiper from "../components/TopicSwiper";
import Topic from "../components/Topic";
import { endpoints } from "../utils/endpoints";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      <TopicSwiper
        topicName="Trending"
        apiUrl={endpoints.trendingMovies}
        topicType="movieTrending"
        mediaType="movie"
      />
      <Topic
        topicName="Popular"
        apiUrl={endpoints.popularMovies}
        topicType="moviePopular"
        mediaType="movie"
      />
      <TopicSwiper
        topicName="Trending TV Series"
        apiUrl={endpoints.trendingTv}
        topicType="tvTrending"
        mediaType="tv"
      />
      <Topic
        topicName="Popular TV Series"
        apiUrl={endpoints.popularTv}
        topicType="tvPopular"
        mediaType="tv"
      />
    </main>
  );
}
