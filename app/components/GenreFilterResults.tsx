"use client";
import styles from "@/app/styles/cardsTopic.module.scss";
import useSWR from "swr";
import { fetcherSearch } from "@/app/utils/fetcher";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { breakpoints } from "@/app/utils/breakPoints";
import { emToPixels } from "@/app/utils/emToPixels";
import Loader from "@/app/components/Loader";
import Error from "@/app/components/Error";
import Card from "@/app/components/Card";
import Pagination from "@mui/material/Pagination";

interface GenreFilterResultsProps {
  params: {
    id: string;
  };
  filterType: "movie" | "tv";
}

const filterTypePath = {
  movie: "/movies/",
  tv: "/tv/",
};

const filterTypeApiPath = {
  movie: "/api/movies/",
  tv: "/api/tv/",
};

const mediaType: Record<"movie" | "tv", "movie" | "tv"> = {
  movie: "movie",
  tv: "tv",
};

const GenreFilterResults = ({
  params,
  filterType,
}: GenreFilterResultsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = filterTypePath[filterType];
  const genreId = params.id;
  const name = decodeURIComponent(searchParams.get("name") || "");

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [siblingCount, setSiblingCount] = useState<number>(0);

  const apiUrl = genreId ? filterTypeApiPath[filterType] : null;

  const { data, error } = useSWR(
    `${apiUrl}${genreId}?page=${currentPage}`,
    fetcherSearch
  );

  const results = data?.results || [];
  const totalResults = data?.totalResults || 0;
  const totalPages = (data?.totalPages >= 500 && 500) || 0;
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
      router.push(
        `${path}${genreId}?name=${encodeURIComponent(name)}&page=${newPage}`
      );
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
                  Found {totalResults} results for {`"${name}"`}
                </h2>
              </div>

              <div className={styles["cardsTopic__cards"]}>
                {results &&
                  results.map((movie: any) => (
                    <Card
                      key={movie.id}
                      movie={movie}
                      mediaType={mediaType[filterType]}
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
export default GenreFilterResults;
