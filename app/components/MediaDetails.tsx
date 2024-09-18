"use client";
import styles from "@/app/styles/mediaDetails.module.scss";
import useSWR from "swr";
import { fetcherMedia } from "@/app/utils/fetcher";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/scss";

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
              <span className={styles["media__release-date"]}>
                {`(${media.release_date.substring(0, 4)})`}
              </span>
            </div>
            <div className={styles["media__quick-info"]}>
              <span className={styles["media__full-release-date"]}>
                Release date: {media.release_date}
              </span>
              <span className={styles["media__language"]}>
                Language: {media.spoken_languages[0].english_name}
              </span>
              <span className={styles["media__length"]}>
                Length: {media.runtime}
              </span>
              <span className={styles["media__status"]}>
                Status: {media.status}
              </span>
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
