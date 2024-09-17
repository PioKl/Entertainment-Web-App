"use client";
import styles from "@/app/styles/mediaDetails.module.scss";
import useSWR from "swr";
import { fetcherMedia } from "@/app/utils/fetcher";
import Loader from "@/app/components/Loader";
import Image from "next/image";

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
          <div>
            <h2>{media.original_title}</h2>
            <h3>{media.release_date}</h3>
            <span>{media.vote_average}</span>
            <span>Votes: {media.vote_count}</span>
            <span>Length: {media.runtime}</span>
            <span>Status: {media.status}</span>
            <span>Language: {media.spoken_languages[0].english_name}</span>
            {media.genres.map((genre: any) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
            <p>{media.overview}</p>
          </div>
        </section>
      )}
    </>
  );
};
export default MediaDetails;
