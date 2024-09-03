"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcherSearch } from "@/app/utils/fetcher";
import Error from "@/app/components/Error";
import Search from "@/app/components/Search";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import stylesPage from "@/app/styles/page.module.scss";
import styles from "@/app/styles/cardsTopic.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import { breakpoints } from "@/app/utils/breakPoints";
import { emToPixels } from "@/app/utils/emToPixels";

const SearchResults = ({ params }: { params: { query: string } }) => {
  const query = params.query;
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [siblingCount, setSiblingCount] = useState<number>(0);

  // URL z parametrami paginacji
  const url = query
    ? `/api/search?query=${encodeURIComponent(query)}&page=${currentPage}`
    : null;

  const { data, error } = useSWR(url, fetcherSearch);

  const results = data?.results || [];
  const totalResults = data?.totalResults || 0;
  const totalPages = data?.totalPages || 0;
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
      router.push(`/search/${query}?page=${newPage}`);
    }
  };

  return (
    <main className={stylesPage.main}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Search />
          {currentPage > totalPages ? (
            <Error errorType="wrongPage" siteType="normal" />
          ) : (
            <section className={styles.cardsTopic}>
              <h2 className={styles["cardsTopic__title"]}>
                Found {totalResults} results for{" "}
                {`"${decodeURIComponent(query)}"`}
              </h2>
              <div className={styles["cardsTopic__cards"]}>
                {results &&
                  results.map((movie: any) => (
                    <Card key={movie.id} movie={movie} mediaType="dynamic" />
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
    </main>
  );
};

export default SearchResults;
