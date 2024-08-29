import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import Card from "./Card";
import Loader from "./Loader";
import styles from "../styles/cardsTopic.module.scss";

interface TopicProps {
  topicName: string;
  apiUrl: string;
}

const Topic: React.FC<TopicProps> = ({ topicName, apiUrl }) => {
  const { data: movies, error } = useSWR(apiUrl, fetcher);

  return (
    <>
      <section className={styles.cardsTopic}>
        <h2 className={styles["cardsTopic__title"]}>{topicName}</h2>

        {error ? (
          <h3 className="error">Something Went Wrong</h3>
        ) : (
          <>
            <div className={styles["cardsTopic__cards"]}>
              {movies &&
                movies.map((movie: any) => (
                  <Card key={movie.id} movie={movie} mediaType="movie" />
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