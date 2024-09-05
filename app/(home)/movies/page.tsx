"use client";
import styles from "@/app/styles/page.module.scss";
import Search from "@/app/components/Search";
import TopicSwiper from "@/app/components/TopicSwiper";
import Topic from "@/app/components/Topic";
import { endpoints } from "@/app/utils/endpoints";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcher";
import { useState, useRef } from "react";

export default function Movies() {
  const { data: genreMovies, error } = useSWR(endpoints.genreMovies, fetcher);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryEndpoint, setCategoryEndpoint] = useState(
    endpoints.popularMovies
  );
  const categoryDropDownMenuRef = useRef<HTMLUListElement>(null);
  console.log(genreMovies);

  const handleCategoryDropdownButton = () => {
    categoryDropDownMenuRef.current &&
      categoryDropDownMenuRef.current.classList.toggle(`${styles["--show"]}`);
  };
  const handleChooseCategoryButton = (name: string, id: number) => {
    setCategoryName(name);
    setCategoryEndpoint(
      endpoints.genreMoviesCategory.replace("{id}", id.toString())
    );
  };
  console.log(categoryEndpoint);

  return (
    <main className={styles.main}>
      <Search searchType="movie" />

      {!error && (
        <div className={styles["category-dropdown"]}>
          <button
            className={styles["category-dropdown__button"]}
            onClick={handleCategoryDropdownButton}
          >
            {!categoryName ? "Choose category" : categoryName}
          </button>
          <ul
            ref={categoryDropDownMenuRef}
            className={`${styles["category-dropdown__options-list"]}`}
          >
            {genreMovies &&
              genreMovies.map((genre: any, index: number) => (
                <li key={index} className={styles["category-dropdown__option"]}>
                  <button
                    onClick={() => {
                      handleChooseCategoryButton(genre.name, genre.id);
                      handleCategoryDropdownButton();
                    }}
                  >
                    {genre.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      <TopicSwiper
        topicName={!categoryName ? "Trending" : categoryName}
        apiUrl={!categoryName ? endpoints.trendingMovies : categoryEndpoint}
        mediaType="movie"
      />
      <Topic topicName="Popular" apiUrl={categoryEndpoint} mediaType="movie" />
    </main>
  );
}
