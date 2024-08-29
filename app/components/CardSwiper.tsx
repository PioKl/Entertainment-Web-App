import styles from "../styles/cardSwiper.module.scss";
import Image from "next/image";
import MovieIcon from "../images/icon-category-movie.svg";
import BookMarkIcon from "../images/icon-bookmark-empty.svg";

interface CardSwiperProps {
  movie: any;
}

const CardSwiper: React.FC<CardSwiperProps> = ({ movie }) => {
  return (
    <div
      className={styles["card-swiper"]}
      //clamp jest również używany w topicSwiper.module.scss
      style={{
        position: "relative",
        height: "clamp(14rem, 5.412rem + 22.901vw, 23rem)",
        width: "100%",
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
        alt={movie.title}
        className={styles["card-swiper__image"]}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: "cover" }}
        priority={true}
      />

      <button type="button" className={styles["card-swiper__bookmark"]}>
        <BookMarkIcon className={styles["card-swiper__bookmark-icon"]} />
      </button>

      <div className={styles["card-swiper__quick-info"]}>
        <ul className={styles["card-swiper__info-items-list"]}>
          <li className={styles["card-swiper__info-list-item"]}>
            {movie.release_date.substring(0, 4)}
          </li>
          <li className={styles["card-swiper__info-list-item"]}>
            <MovieIcon />
          </li>
          <li className={styles["card-swiper__info-list-item"]}>
            <span>Movie</span>
          </li>
        </ul>
        <span className={styles["card-swiper__title"]}>{movie.title}</span>
      </div>
    </div>
  );
};

export default CardSwiper;
