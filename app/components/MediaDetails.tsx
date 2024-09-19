"use client";
import styles from "@/app/styles/mediaDetails.module.scss";
import useSWR from "swr";
import { fetcherMedia } from "@/app/utils/fetcher";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface MediaDetailsProps {
  params: {
    id: string;
  };
  mediaType: "movie" | "tv";
}

const mediaTypeApiPath = {
  movie: "/api/movies/movie/",
  tv: "/api/tv/details/",
};

const MediaDetails = ({ params, mediaType }: MediaDetailsProps) => {
  const id = params.id;

  const apiUrl = id ? mediaTypeApiPath[mediaType] : null;

  const { data, error } = useSWR(`${apiUrl}${id}`, fetcherMedia);

  const results = data || [];
  const loading = !data && !error;
  const { media, crew } = results;

  console.log(results);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.media}>
          <div className={styles["media__image-container"]}>
            <Image
              src={`https://image.tmdb.org/t/p/w780/${media.poster_path}`}
              className={styles["media__image"]}
              alt="poster"
              width={350}
              height={530}
            />
          </div>
          <div className={styles["media__details"]}>
            <div className={styles["media__title-container"]}>
              <h2 className={styles["media__title"]}>{media.original_title}</h2>
              {media.release_date && (
                <span className={styles["media__release-date"]}>
                  {`(${media.release_date.substring(0, 4)})`}
                </span>
              )}
            </div>
            <div className={styles["media__quick-info"]}>
              <span className={styles["media__full-release-date"]}>
                Release date: {media.release_date}
              </span>
              {media.spoken_languages.length > 0 && (
                <span className={styles["media__language"]}>
                  {" "}
                  Language: {media.spoken_languages[0].english_name}
                </span>
              )}
              <span className={styles["media__length"]}>
                Length: {media.runtime}
              </span>
              <span className={styles["media__status"]}>
                Status: {media.status}
              </span>
            </div>
            <div className={styles["media__rating-container"]}>
              <div className={styles["media__single-chart"]}>
                <svg
                  viewBox="0 0 36 36"
                  className={`${styles["media__circular-chart"]} ${
                    styles[
                      `${
                        media.vote_average * 10 < 40
                          ? "red"
                          : media.vote_average * 10 < 70
                          ? "orange"
                          : "green"
                      }`
                    ]
                  }`}
                >
                  <path
                    className={styles["media__circle-bg"]}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={styles["media__circle"]}
                    strokeDasharray={`${`${media.vote_average * 10}, 100`}`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text
                    x="18"
                    y="20.35"
                    className={styles["media__percentage"]}
                  >
                    {parseFloat((media.vote_average * 10).toFixed(1))}%
                  </text>
                </svg>
              </div>
              <span>Users score</span>
            </div>
            <div className={styles["media__genre-container"]}>
              {media.genres.map((genre: any) => (
                <span className={styles["media__genre"]} key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
            <div className={styles["media__overview-container"]}>
              <p>{media.overview}</p>
            </div>

            <div className={styles["media__cast"]}>
              <Swiper
                grabCursor={true}
                slidesPerView={5.5}
                spaceBetween={20}
                centeredSlides={false}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {crew.cast.map((cast: any) => (
                  <SwiperSlide key={cast.id}>
                    <div
                      style={{
                        position: "relative",
                        height: "175px",
                        width: "100%",
                      }}
                    >
                      {cast.profile_path && (
                        <Image
                          src={`https://image.tmdb.org/t/p/w780/${cast.profile_path}`}
                          alt="profile"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          fill
                          style={{ objectFit: "cover" }}
                          priority={true}
                        />
                      )}
                    </div>

                    <span>{cast.name}</span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default MediaDetails;
