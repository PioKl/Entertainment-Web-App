import useSWR from "swr";
import { useRouter } from "next/navigation";
import { fetcher } from "../utils/fetcher";
import Card from "./Card";
import Error from "@/app/components/Error";
import Loader from "./Loader";
import styles from "../styles/cardsTopic.module.scss";

interface TopicProps {
  topicName: string;
  apiUrl: string;
  topicType?: "moviePopular" | "tvPopular"; //?: opcjonalny props
  mediaType?: "dynamic" | "movie" | "tv";
}

const topicSeeMorePath = {
  moviePopular: "/movies/popular/1",
  tvPopular: "/tv/popular/1",
};

const Topic: React.FC<TopicProps> = ({
  topicName,
  apiUrl,
  topicType,
  mediaType = "dynamic",
}) => {
  const router = useRouter();
  const { data: movies, error } = useSWR(apiUrl, fetcher);

  const handleSeeMoreButton = () => {
    {
      topicType && router.push(topicSeeMorePath[topicType]);
    }
  };

  return (
    <>
      <section className={styles.cardsTopic}>
        <div className={styles["cardsTopic__title-container"]}>
          <h2 className={styles["cardsTopic__title"]}>{topicName}</h2>
          {!error && topicType && (
            <button
              className={`btn ${styles["cardsTopic__more-button"]}`}
              onClick={handleSeeMoreButton}
            >
              See More
            </button>
          )}
        </div>

        {error ? (
          <Error errorType="error" siteType="static" />
        ) : (
          <>
            <div className={styles["cardsTopic__cards"]}>
              {movies &&
                movies.map((movie: any) => (
                  <Card key={movie.id} movie={movie} mediaType={mediaType} />
                ))}
            </div>
            {!movies && <Loader />}
          </>
        )}
      </section>
    </>
  );
};

export default Topic;
