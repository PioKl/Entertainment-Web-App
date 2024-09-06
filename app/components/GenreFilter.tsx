"use client";
import styles from "@/app/styles/page.module.scss";
import { endpoints } from "@/app/utils/endpoints";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcher";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface GenreFilterProps {
  filterType: "movie" | "tv";
}

const filterTypePath = {
  movie: "/movies/",
  tv: "/tv/",
};

const filterTypeEndpoint = {
  movie: endpoints.genreMovies,
  tv: endpoints.genreTv,
};

const filterPlaceholder = {
  movie: "Choose category for movies",
  tv: "Choose category for tv",
};

const GenreFilter: React.FC<GenreFilterProps> = ({ filterType }) => {
  const router = useRouter();
  const [id, setId] = useState("");
  const path = filterTypePath[filterType];

  const handleSearchByGenre = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id.length === 0) {
      return;
    } else {
      router.push(`${path}${id}?name=${encodeURIComponent(genreName)}&page=1`);
      setId("");
    }
  };

  const { data: genreList, error } = useSWR(
    filterTypeEndpoint[filterType],
    fetcher
  );
  const [genreName, setGenreName] = useState<string>("");
  const genreDropDownMenuRef = useRef<HTMLUListElement>(null);

  const handleGenreDropdownButton = () => {
    genreDropDownMenuRef.current &&
      genreDropDownMenuRef.current.classList.toggle(`${styles["--show"]}`);
  };
  const handleChooseGenreButton = (name: string, id: number) => {
    setId(id.toString());
    setGenreName(name);
  };

  return (
    <>
      {!error && (
        <div className={styles["genre-dropdown"]}>
          <form onSubmit={handleSearchByGenre}>
            <button
              type="button"
              className={styles["genre-dropdown__button"]}
              onClick={handleGenreDropdownButton}
            >
              {!genreName ? `${filterPlaceholder[filterType]}` : genreName}
            </button>
            <ul
              ref={genreDropDownMenuRef}
              className={`${styles["genre-dropdown__options-list"]}`}
            >
              {genreList &&
                genreList.map((genre: any, index: number) => (
                  <li key={index} className={styles["genre-dropdown__option"]}>
                    <button
                      type="submit"
                      onClick={() => {
                        handleChooseGenreButton(genre.name, genre.id);
                        handleGenreDropdownButton();
                      }}
                    >
                      {genre.name}
                    </button>
                  </li>
                ))}
            </ul>
          </form>
        </div>
      )}
    </>
  );
};

export default GenreFilter;
