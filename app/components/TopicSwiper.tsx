import useSWR from "swr";
import { useRouter } from "next/navigation";
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
  topicType?: "movieTrending" | "tvTrending"; //?: opcjonalny props
  mediaType?: "dynamic" | "movie" | "tv";
}

const topicSwiperSeeMorePath = {
  movieTrending: "/movies/trending/1",
  tvTrending: "/tv/trending/1",
};

const TopicSwiper: React.FC<TopicSwiperProps> = ({
  topicName,
  apiUrl,
  topicType,
  mediaType = "dynamic",
}) => {
  const router = useRouter();
  const { data: movies, error } = useSWR(apiUrl, fetcher);

  const handleSeeMoreButton = () => {
    {
      topicType && router.push(topicSwiperSeeMorePath[topicType]);
    }
  };

  return (
    <>
      <section
        className={`${styles["topic-swiper"]} ${error && styles["--error"]}`}
      >
        <div
          className={`${styles["topic-swiper__heading-loader-container"]} ${
            !error && movies && styles["--reset"]
          }`}
        >
          <div className={styles["topic-swiper__heading-container"]}>
            <h2 className={styles["topic-swiper__heading"]}>{topicName}</h2>
            {!error && topicType && (
              <button
                className={`btn-more ${styles["topic-swiper__more-button"]}`}
                onClick={handleSeeMoreButton}
              >
                See More
              </button>
            )}
          </div>
          {!error && !movies && <Loader />}
        </div>

        <div
          className={`${styles["topic-swiper__container"]} ${
            error && styles["--error"]
          }`}
        >
          <div className={styles["topic-swiper__placeholder"]}>
            <span>-</span>
          </div>
          {error ? (
            <Error errorType="error" siteType="normal" />
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
                      <CardSwiper movie={movie} mediaType={mediaType} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TopicSwiper;
