import styles from "../styles/cardTrending.module.scss";
import Image from "next/image";
import MovieIcon from "../images/icon-category-movie.svg";
import BookMarkIcon from "../images/icon-bookmark-empty.svg";

interface CardTrendingProps {
  movie: any;
}

const CardTrending: React.FC<CardTrendingProps> = ({ movie }) => {
  return (
    <div
      className={styles["card-trending"]}
      //clamp jest również używany w trending.module.scss
      style={{
        position: "relative",
        height: "clamp(14rem, 5.412rem + 22.901vw, 23rem)",
        width: "100%",
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
        alt={movie.title}
        className={styles["card-trending__image"]}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: "cover" }}
        priority={true}
      />

      <button type="button" className={styles["card-trending__bookmark"]}>
        <BookMarkIcon className={styles["card-trending__bookmark-icon"]} />
      </button>

      <div className={styles["card-trending__quick-info"]}>
        <ul className={styles["card-trending__info-items-list"]}>
          <li className={styles["card-trending__info-list-item"]}>
            {movie.release_date.substring(0, 4)}
          </li>
          <li className={styles["card-trending__info-list-item"]}>
            <MovieIcon />
          </li>
          <li className={styles["card-trending__info-list-item"]}>
            <span>Movie</span>
          </li>
        </ul>
        <span className={styles["card-trending__title"]}>{movie.title}</span>
      </div>
    </div>
  );
};

export default CardTrending;
