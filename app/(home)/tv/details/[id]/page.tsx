"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import MediaDetails from "@/app/components/MediaDetails";

const TvDetails = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Search searchType="tv" />
      <MediaDetails params={params} mediaType="tv" />
    </main>
  );
};
export default TvDetails;
