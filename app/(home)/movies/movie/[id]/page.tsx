"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import MediaDetails from "@/app/components/MediaDetails";

const MovieDetails = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="movie" />
      <MediaDetails params={params} mediaType="movie" />
    </main>
  );
};
export default MovieDetails;
