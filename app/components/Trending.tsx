import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/scss";
import CardTrending from "./CardTrending";
import Loader from "./Loader";
import styles from "../styles/trending.module.scss";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.results);

export default function Trending() {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return (
    <>
      <section className={styles.trending}>
        <h2 className={styles["trending__heading"]}>Trending</h2>
        <div className={styles["trending__swiper"]}>
          {movies ? (
            <Swiper
              grabCursor={true}
              slidesPerView={1.5}
              spaceBetween={16}
              breakpoints={{
                1110: {
                  slidesPerView: 2.5,
                  spaceBetween: 40,
                },
              }}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {movies.map((movie: any) => (
                <SwiperSlide key={movie.id}>
                  <CardTrending movie={movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Loader />
          )}
        </div>
      </section>
      <h2>Test</h2>
    </>
  );
}
