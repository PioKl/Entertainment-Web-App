import styles from "../styles/card.module.scss";
import Image from "next/image";
import BookMarkIcon from "../images/icon-bookmark-empty.svg";
import MovieIcon from "../images/icon-category-movie.svg";

interface CardProps {
  movie: any;
  mediaType: "dynamic" | "movie" | "tv";
}

const Card: React.FC<CardProps> = ({ movie, mediaType }) => {
  return (
    <div className={styles["card"]}>
      <div
        className={styles["card__image-container"]}
        style={{
          position: "relative",
        }}
      >
        {(movie.backdrop_path || movie.poster_path) && (
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
        )}
        {/* w przyszlości z active className={`${styles.card__bookmark} ${styles['--active']}`} */}
        <button type="button" className={`${styles.card__bookmark}`}>
          <BookMarkIcon className={styles["card__bookmark-icon"]} />
        </button>
      </div>
      <div className={styles["card__quick-info"]}>
        <ul className={styles["card__info-items-list"]}>
          <li className={styles["card__info-list-item"]}>
            {movie.release_date
              ? movie.release_date && movie.release_date.substring(0, 4)
              : movie.first_air_date && movie.first_air_date.substring(0, 4)}
          </li>
          <li className={styles["card__info-list-item"]}>
            <MovieIcon />
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
