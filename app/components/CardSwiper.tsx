import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcher";
import styles from "../styles/cardSwiper.module.scss";
import Image from "next/image";
import MovieIcon from "../images/icon-category-movie.svg";
import TvIcon from "@/app/images/icon-category-tv.svg";
import BookMarkIcon from "../images/icon-bookmark-empty.svg";
import IconInfo from "@/app/images/icon-info.svg";
import PlayVideo from "./PlayVideo";
import { useTrailerNavigation } from "../hooks/useTrailersNavigation";

interface CardSwiperProps {
  movie: any;
  mediaType?: "dynamic" | "movie" | "tv";
}

const mediaPath = {
  moviePath: "/movies/movie/",
  tvPath: "/tv/details/",
};

//Mapowanie mediaType na odpowiednie klucze obiektu mediaPath
const mediaTypeToPathKey: Record<string, keyof typeof mediaPath> = {
  movie: "moviePath",
  tv: "tvPath",
};
const CardSwiper: React.FC<CardSwiperProps> = ({
  movie,
  mediaType = "dynamic",
}) => {
  const router = useRouter();
  const [playMovie, setPlayMovie] = useState(false);
  const handleMediaDetails = () => {
    //Poniżej dla search gdy pokazuje zarówno movie i tv
    movie.media_type === "movie" && router.push(`/movies/movie/${movie.id}`);
    movie.media_type === "tv" && router.push(`/tv/details/${movie.id}`);
    //Poniżej dla wszystkich innych
    !movie.media_type &&
      router.push(`${mediaPath[mediaTypeToPathKey[mediaType]]}${movie.id}`);
  };

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${process.env.API_KEY}`,
    fetcher
  );

  const handlePlayMovie = () => {
    setPlayMovie(!playMovie);
  };

  //W projekcie mam kilka sposobów na użycie handleNextTrailer i handlePreviousTrailer. W Card i CardSwiper jest przy użycie hooka useTrailerNavigation
  //Natomiast w ModalTrailers za pomocą funkcji handleNextTrailer i handlePreviousTrailer, po prostu dwa różne sposoby, a efekt będzie ten sam.
  const {
    trailerNumber,
    setTrailerNumber,
    handleNextTrailer,
    handlePreviousTrailer,
  } = useTrailerNavigation(data);

  return (
    <div
      tabIndex={0}
      className={styles["card-swiper"]}
      //clamp jest również używany w topicSwiper.module.scss
      style={{
        position: "relative",
        height: "clamp(14rem, 5.412rem + 22.901vw, 23rem)",
        width: "100%",
      }}
      onClick={data && data.length > 0 ? handlePlayMovie : undefined}
      onKeyDown={(e) => {
        e.key === "Enter" && data && data.length > 0
          ? handlePlayMovie()
          : undefined;
        e.key === "ArrowRight" && handleNextTrailer();
        e.key === "ArrowLeft" && handlePreviousTrailer();
      }}
    >
      {(movie.backdrop_path || movie.poster_path) &&
        (playMovie && data[0] ? (
          <iframe
            className={styles["card-swiper__iframe"]}
            src={`https://www.youtube.com/embed/${data[trailerNumber].key}?autoplay=1`}
            allow="fullscreen; autoplay"
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></iframe>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w780/${
              movie.backdrop_path ? movie.backdrop_path : movie.poster_path
            }`}
            alt={movie.title || movie.name}
            className={styles["card-swiper__image"]}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={true}
          />
        ))}
      <PlayVideo
        data={data}
        type="card-swiper"
        playMovie={playMovie}
        setPlayMovie={setPlayMovie}
        trailerNumber={trailerNumber}
        setTrailerNumber={setTrailerNumber}
      />
      <div
        className={styles["card-swiper__options-buttons"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      >
        {!playMovie && (
          <>
            {/* W przyszłości z active className={`${styles.card-swiper__bookmark} ${styles['--active']}`} */}
            <button
              type="button"
              className={styles["card-swiper__bookmark"]}
              title="bookmark"
            >
              <BookMarkIcon className={styles["card-swiper__bookmark-icon"]} />
            </button>
            <button
              type="button"
              className={`btn-option ${styles["card-swiper__info-button"]}`}
              onClick={handleMediaDetails}
              title="details"
            >
              <IconInfo className={styles["card-swiper__info-icon"]} />
            </button>
          </>
        )}
      </div>

      {!playMovie && (
        <div className={styles["card-swiper__quick-info"]}>
          <ul className={styles["card-swiper__info-items-list"]}>
            <li className={styles["card-swiper__info-list-item"]}>
              {movie.release_date
                ? movie.release_date && movie.release_date.substring(0, 4)
                : movie.first_air_date && movie.first_air_date.substring(0, 4)}
            </li>
            <li className={styles["card-swiper__info-list-item"]}>
              {mediaType === "dynamic" && <MovieIcon />}
              {mediaType === "movie" && <MovieIcon />}
              {mediaType === "tv" && <TvIcon />}
            </li>
            <li className={styles["card-swiper__info-list-item"]}>
              {mediaType === "dynamic" &&
                (movie.media_type === "movie" ? "Movie" : "TV Series")}
              {mediaType === "movie" && "Movie"}
              {mediaType === "tv" && "TV Series"}
            </li>
          </ul>
          <span className={styles["card-swiper__title"]}>
            {movie.title || movie.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default CardSwiper;
