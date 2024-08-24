import useSWR from "swr";
import Card from "./Card";
import Loader from "./Loader";
import styles from "../styles/cardsTopic.module.scss";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);

export default function Trending() {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );
  /* console.log(movies); */

  return (
    <>
      <section className={styles.cardsTopic}>
        <h2 className={styles["cardsTopic__title"]}>Popular</h2>
        <div className={styles["cardsTopic__cards"]}>
          {movies ? (
            movies.map((movie: any) => <Card key={movie.id} movie={movie} />)
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
}
