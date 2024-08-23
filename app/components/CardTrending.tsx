import styles from "../styles/cardTrending.module.scss";
import Image from "next/image";

interface CardTrendingProps {
  movie: any;
}

const CardTrending: React.FC<CardTrendingProps> = ({ movie }) => {
  return (
    <div className={styles["card-trending"]}>
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className={styles["card-trending__image"]}
        width={470}
        height={230}
        priority={true}
        style={{ minHeight: "140px", width: "auto", height: "auto" }}
      />
      <h3 className={styles["card-trending__title"]}>{movie.title}</h3>
    </div>
  );
};

export default CardTrending;
