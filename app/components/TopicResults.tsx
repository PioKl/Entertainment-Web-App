"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcherSearch } from "@/app/utils/fetcher";
import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import styles from "@/app/styles/cardsTopic.module.scss";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { breakpoints } from "@/app/utils/breakPoints";
import { emToPixels } from "@/app/utils/emToPixels";

interface TopicResultsProps {
  params: {
    id: string;
  };
  topicType: "movieTrending" | "moviePopular" | "tvTrending" | "tvPopular";
}

const topicName = {
  movieTrending: "Trending",
  moviePopular: "Popular",
  tvTrending: "Trending",
  tvPopular: "Popular",
};

const topicTypeApiPath = {
  movieTrending: "/api/movies/trending/",
  moviePopular: "/api/movies/popular/",
  tvTrending: "/api/tv/trending/",
  tvPopular: "/api/tv/popular/",
};

const topicTypePath = {
  movieTrending: "/movies/trending",
  moviePopular: "/movies/popular",
  tvTrending: "/tv/trending",
  tvPopular: "/tv/popular",
};

const mediaType: Record<
  "all" | "movieTrending" | "moviePopular" | "tvTrending" | "tvPopular",
  "dynamic" | "movie" | "tv"
> = {
  all: "dynamic",
  movieTrending: "movie",
  moviePopular: "movie",
  tvTrending: "tv",
  tvPopular: "tv",
};

const TopicResults = ({ params, topicType }: TopicResultsProps) => {
  //Routing, ścieżka
  const router = useRouter();
  const path = topicTypePath[topicType];
  const genreId = params.id;
  console.log(genreId);

  //Zmiany stron
  const initialPage = parseInt(genreId || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [siblingCount, setSiblingCount] = useState<number>(0);

  //Połączenie z api w celu pobrania odpowiednich danych
  const apiUrl = `${topicTypeApiPath[topicType]}${currentPage}`;
  const { data, error } = useSWR(apiUrl, fetcherSearch);

  //Wynik
  const results = data?.results || [];
  console.log(results);
  const totalPages = (data?.totalPages >= 500 && 500) || 0;
  console.log(data?.totalPages);

  //Kiedy ma występować efekt ładowania
  const loading = !data && !error;

  useEffect(() => {
    if (window.innerWidth > emToPixels(breakpoints.bpTablet)) {
      setSiblingCount(2);
    } else if (window.innerWidth > 400) {
      setSiblingCount(1);
    } else {
      setSiblingCount(0);
    }
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      router.push(`${path}/${newPage}`); // Dynamiczne zmienianie URL
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentPage > totalPages ? (
            <Error errorType="wrongPage" siteType="normal" />
          ) : (
            <section className={styles.cardsTopic}>
              <div className={styles["cardsTopic__title-container"]}>
                <h2 className={styles["cardsTopic__title"]}>
                  {topicName[topicType]}
                </h2>
              </div>

              <div className={styles["cardsTopic__cards"]}>
                {results.map((movie: any) => (
                  <Card
                    key={movie.id}
                    movie={movie}
                    mediaType={mediaType[topicType]}
                  />
                ))}
              </div>
              <Pagination
                count={totalPages}
                page={currentPage}
                siblingCount={siblingCount}
                onChange={handlePageChange}
                className="pagination"
              />
            </section>
          )}
        </>
      )}
    </>
  );
};

export default TopicResults;
