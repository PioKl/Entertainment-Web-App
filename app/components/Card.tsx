import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcher";
import styles from "../styles/card.module.scss";
import Image from "next/image";
import BookMarkIcon from "../images/icon-bookmark-empty.svg";
import IconInfo from "@/app/images/icon-info.svg";
import IconClose from "@/app/images/icon-close.svg";
import IconPlay from "../images/icon-play.svg";
import MovieIcon from "../images/icon-category-movie.svg";
import TvIcon from "@/app/images/icon-category-tv.svg";

interface CardProps {
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

const Card: React.FC<CardProps> = ({ movie, mediaType = "dynamic" }) => {
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
    `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  const handlePlayMovie = () => {
    setPlayMovie(!playMovie);
  };
  return (
    <div
      tabIndex={0}
      className={styles["card"]}
      onClick={handlePlayMovie}
      onKeyDown={(e) => {
        e.key === "Enter" && handlePlayMovie();
      }}
    >
      <div
        className={`${styles["card__image-container"]} ${
          playMovie && styles["--play-active"]
        }`}
        style={{
          position: "relative",
        }}
      >
        {(movie.backdrop_path || movie.poster_path) &&
          (playMovie && data[0] ? (
            <iframe
              className={styles["card__iframe"]}
              src={`https://www.youtube.com/embed/${data[0].key}?autoplay=1`}
              allow="fullscreen"
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
              className={styles["card__image"]}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          ))}
        {/* w przyszlości z active className={`${styles.card__bookmark} ${styles['--active']}`} */}
        {data && data.length > 0 && (
          <div
            className={`${styles["card__video-container"]} ${
              playMovie && styles["--play-active"]
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handlePlayMovie();
            }}
          >
            <button type="button" className={styles["card__play-button"]}>
              <IconPlay className={styles["card__play-icon"]} />
              <span className={styles["card__play-span"]}>Play</span>
            </button>
          </div>
        )}
        <div
          className={styles["card__options-buttons"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {!playMovie && (
            <>
              <button type="button" className={`${styles.card__bookmark}`}>
                <BookMarkIcon className={styles["card__bookmark-icon"]} />
              </button>
              <button
                type="button"
                className={`btn-option ${styles["card__info-button"]}`}
                onClick={handleMediaDetails}
              >
                <IconInfo className={styles["card__info-icon"]} />
              </button>
            </>
          )}
          {playMovie && (
            <button
              type="button"
              className={`btn-option ${styles["card__close-button"]}`}
              onClick={handlePlayMovie}
            >
              <IconClose className={styles["card__close-icon"]} />
            </button>
          )}
        </div>
      </div>
      <div className={styles["card__quick-info"]}>
        <ul className={styles["card__info-items-list"]}>
          <li className={styles["card__info-list-item"]}>
            {movie.release_date
              ? movie.release_date && movie.release_date.substring(0, 4)
              : movie.first_air_date && movie.first_air_date.substring(0, 4)}
          </li>
          <li className={styles["card__info-list-item"]}>
            {mediaType === "dynamic" && <MovieIcon />}
            {mediaType === "movie" && <MovieIcon />}
            {mediaType === "tv" && <TvIcon />}
          </li>
          <li className={styles["card__info-list-item"]}>
            <span className={styles["card__media-type"]}>
              {mediaType === "dynamic" &&
                (movie.media_type === "movie" ? "Movie" : "TV Series")}
              {mediaType === "movie" && "Movie"}
              {mediaType === "tv" && "TV Series"}
            </span>
          </li>
        </ul>
        <span className={styles["card__title"]}>
          {movie.title || movie.name}
        </span>
      </div>
    </div>
  );
};

export default Card;
