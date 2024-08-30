import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/scss";
import Error from "@/app/components/Error";
import CardSwiper from "./CardSwiper";
import Loader from "./Loader";
import styles from "../styles/topicSwiper.module.scss";

interface TopicSwiperProps {
  topicName: string;
  apiUrl: string;
}

const TopicSwiper: React.FC<TopicSwiperProps> = ({ topicName, apiUrl }) => {
  const { data: movies, error } = useSWR(apiUrl, fetcher);

  return (
    <>
      <section className={styles["topic-swiper"]}>
        <div className={styles["topic-swiper__container"]}>
          <h2 className={styles["topic-swiper__heading"]}>{topicName}</h2>
          {error ? (
            <Error errorType="error" siteType="static" />
          ) : (
            <div className={styles["topic-swiper__swiper"]}>
              {movies && (
                <Swiper
                  grabCursor={true}
                  slidesPerView={1.5}
                  spaceBetween={16}
                  breakpoints={{
                    600: {
                      slidesPerView: 2.5,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 1.5,
                      spaceBetween: 40,
                    },
                    800: {
                      slidesPerView: 2.5,
                      spaceBetween: 40,
                    },
                    1110: {
                      slidesPerView: 2.5,
                      spaceBetween: 40,
                    },
                    1441: {
                      slidesPerView: 3.5,
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
                      <CardSwiper movie={movie} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
        </div>
        {!error && !movies && <Loader />}
      </section>
    </>
  );
};

export default TopicSwiper;
