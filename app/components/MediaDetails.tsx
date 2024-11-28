"use client";
import { useEffect, useState } from "react";
import styles from "@/app/styles/mediaDetails.module.scss";
import useSWR from "swr";
import { fetcherMedia } from "@/app/utils/fetcher";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/scss";
import HalfStar from "@/app/images/half-star.svg";
import Star from "@/app/images/star.svg";
import EmptyStar from "@/app/images/empty-star.svg";
import IconLink from "@/app/images/icon-link.svg";
import IconVideo from "@/app/images/icon-video.svg";
import { breakpoints } from "@/app/utils/breakPoints";
import { emToPixels } from "@/app/utils/emToPixels";
import ModalTrailers from "@/app/components/ModalTrailers";
import Error from "./Error";

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
  const { media = {}, crew = [], trailers = [] } = results;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Zablokowanie tabulacji na elementach homeLayout, ma działać tylko modal
  useEffect(() => {
    const homeLayout = document.getElementById("homeLayout");
    const modal = document.getElementById("modalId");
    if (homeLayout) {
      const homeLayoutElements = homeLayout.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (isModalOpen) {
        modal && modal.focus();
        homeLayoutElements.forEach((element) => {
          element.setAttribute("tabindex", "-1");
        });
      } else {
        homeLayoutElements.forEach((element) => {
          element.setAttribute("tabindex", "0");
        });
      }
    }
  }, [isModalOpen]);

  const renderStars = (vote_average: number) => {
    const rating = (vote_average * 5) / 10; // Przekształcenie oceny z 0-10 na 0-5, czyli od 0 do 5, co oznacza od 0 do 5 gwiazdek
    const fullStars = Math.floor(rating); // Pełne gwiazdki
    const hasHalfStar = rating - fullStars >= 0.5; // Sprawdzanie, czy jest połówkowa gwiazdka, czyli np. 3.1 nie da połówki, ale od 3.5 już da, jeszcze tak to można zapisać rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Puste gwiazdki

    return (
      <>
        {/* //Szybka tablica z zawartością x elementów, _ to niepotrzebny parametr,, i index elementu */}
        {Array.from({ length: fullStars }, (_, i) => (
          <Star
            className={`${styles["media__star"]} ${styles["--full"]}`}
            key={i}
          />
        ))}
        {hasHalfStar && (
          <HalfStar
            className={`${styles["media__star"]} ${styles["--half"]}`}
            key={"half-star"}
          />
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <EmptyStar
            className={`${styles["media__star"]} ${styles["--empty"]}`}
            key={i}
          />
        ))}
      </>
    );
  };

  //Sprawdzenie, czy nastąpiła zmiana wymaganej rozdzielczości, jeśli tak to zmieni się na true
  const [imageResize, setImageResize] = useState(false);

  useEffect(() => {
    const handleImageResize = () => {
      setImageResize(window.innerWidth >= emToPixels(breakpoints.bpTablet));
    };

    // Wywołanie funkcji, aby sprawdzić początkowy rozmiar
    handleImageResize();

    //Nasłuchiwanie zmian przy resize
    window.addEventListener("resize", handleImageResize);

    //Usunięcie nasłuchiwania przy odmontowanie
    return () => {
      window.removeEventListener("resize", handleImageResize);
    };
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          {media.crew === false ||
          crew.success === false ||
          trailers.success ? (
            <Error errorType="wrongPage" siteType="normal" />
          ) : (
            <>
              {isModalOpen && (
                <ModalTrailers
                  data={{ trailers, media }}
                  closeModal={closeModal}
                />
              )}
              <section className={styles.media}>
                <div className={styles["media__poster"]}>
                  <div
                    className={styles["media__image-container"]}
                    style={
                      imageResize
                        ? {}
                        : {
                            position: "relative",
                            height:
                              "clamp(22.5rem, -3.74rem + 69.975vw, 50rem)",
                            width: "100%",
                          }
                    }
                  >
                    {imageResize ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
                        className={styles["media__image"]}
                        alt="poster"
                        width={350}
                        height={530}
                      />
                    ) : (
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
                        className={styles["media__image"]}
                        alt="poster"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={true}
                      />
                    )}
                  </div>
                  {media.vote_average >= 0 && (
                    <div className={styles["media__stars-container"]}>
                      {renderStars(media.vote_average)}
                    </div>
                  )}
                </div>

                <div className={styles["media__details"]}>
                  <div className={styles["media__title-and-tagline-container"]}>
                    <div className={styles["media__title-container"]}>
                      {(media.original_title || media.original_name) && (
                        <h2 className={styles["media__title"]}>
                          {mediaType === "movie"
                            ? media.original_title
                            : mediaType === "tv" && media.original_name}
                        </h2>
                      )}
                      {(media.release_date || media.first_air_date) && (
                        <span className={styles["media__release-date"]}>
                          {mediaType === "movie"
                            ? `(${media.release_date.substring(0, 4)})`
                            : mediaType === "tv" &&
                              `(${media.first_air_date.substring(0, 4)})`}
                        </span>
                      )}
                    </div>
                    {(media.original_title || media.original_name) &&
                      media.tagline && (
                        <div className={styles["media__tagline-container"]}>
                          <span>{media.tagline}</span>
                        </div>
                      )}
                  </div>

                  <div className={styles["media__quick-info"]}>
                    {(media.release_date || media.first_air_date) && (
                      <span className={styles["media__full-release-date"]}>
                        Release date:{" "}
                        {mediaType === "movie"
                          ? media.release_date
                          : mediaType === "tv" && media.first_air_date}
                      </span>
                    )}
                    {media.spoken_languages.length > 0 && (
                      <span className={styles["media__language"]}>
                        {" "}
                        Language: {media.spoken_languages[0].english_name}
                      </span>
                    )}
                    {media.runtime && (
                      <span className={styles["media__length"]}>
                        Length:{" "}
                        {`${Math.floor(media.runtime / 60)}h ${
                          media.runtime % 60
                        }min`}
                      </span>
                    )}
                    {media.status && (
                      <span className={styles["media__status"]}>
                        Status: {media.status}
                      </span>
                    )}
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
                          strokeDasharray={`${`${
                            media.vote_average * 10
                          }, 100`}`}
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
                  {media.genres && (
                    <div className={styles["media__genre-container"]}>
                      {media.genres.map((genre: any) => (
                        <span className={styles["media__genre"]} key={genre.id}>
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {media.overview && (
                    <div className={styles["media__overview-container"]}>
                      <h3
                        className={styles["media__overview-container__heading"]}
                      >
                        Overview
                      </h3>
                      <p>{media.overview}</p>
                    </div>
                  )}

                  <div className={styles["media__cast"]}>
                    <Swiper
                      grabCursor={true}
                      slidesPerView={2.5}
                      spaceBetween={20}
                      centeredSlides={false}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      breakpoints={{
                        400: {
                          slidesPerView: 3.5,
                        },
                        500: {
                          slidesPerView: 4.5,
                        },
                        650: {
                          slidesPerView: 5.5,
                        },
                        768: {
                          slidesPerView: 2.5,
                        },
                        870: {
                          slidesPerView: 3.5,
                        },
                        1000: {
                          slidesPerView: 4.5,
                        },
                        1280: {
                          slidesPerView: 5.5,
                        },
                      }}
                    >
                      {crew.cast.map((cast: any) => (
                        <SwiperSlide key={cast.id}>
                          <div
                            className={styles["media__cast-image-container"]}
                            style={{
                              position: "relative",
                              height: "175px",
                              width: "100%",
                            }}
                          >
                            {cast.profile_path && (
                              <Image
                                className={styles["media__cast-image"]}
                                src={`https://image.tmdb.org/t/p/w780/${cast.profile_path}`}
                                alt="profile"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                fill
                                style={{ objectFit: "contain" }}
                                priority={true}
                              />
                            )}
                          </div>
                          {cast.name && (
                            <div className={styles["media__cast-role"]}>
                              <span
                                className={styles["media__cast-role__name"]}
                              >
                                {cast.name}
                              </span>
                              {cast.character && (
                                <span
                                  className={
                                    styles["media__cast-role__character"]
                                  }
                                >
                                  {cast.character}
                                </span>
                              )}
                            </div>
                          )}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className={styles["media__links"]}>
                    {media.homepage && (
                      <>
                        <a
                          className={`btn ${styles["media__button"]}`}
                          href={media.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website
                          <IconLink className={styles["media__link-icon"]} />
                        </a>
                      </>
                    )}
                    {data.trailers.results &&
                      data.trailers.results.length > 0 && (
                        <button
                          className={`btn ${styles["media__button"]}`}
                          onClick={openModal}
                        >
                          <span className={styles["media__button-span"]}>
                            Trailers
                          </span>
                          <IconVideo className={styles["media__link-icon"]} />
                        </button>
                      )}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};
export default MediaDetails;
