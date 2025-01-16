"use client";
import useSWR from "swr";
import useBookmarks from "@/app/hooks/useBookmarks";
import Card from "@/app/components/Card";
import styles from "@/app/styles/cardsTopic.module.scss";
import stylesBookmarks from "@/app/styles/bookmarks.module.scss";
import Loader from "@/app/components/Loader";
import Error from "@/app/components/Error";
import { useState, useMemo } from "react";
import { fetcherPromise } from "@/app/utils/fetcher";
import { getMovie, getTv } from "@/app/utils/endpoints";

//Interface BookmarkItem dla zakładek
interface BookmarkItem {
  id: string;
  type: "movie" | "tv";
}

//Funkcja fetchMany przyjmuje tablicę URL-i i zwraca obietnicę z tablicą elementów typu T
//Każdy element, który jest zwracany jako wynik funkcji, będzie miał pole id potrzebne przy renderowaniu listy
const fetchMany = async <T extends { id: number }>(
  urls: string[]
): Promise<T[]> => {
  return Promise.all(urls.map((url) => fetcherPromise<T>(url)));
};

//id: number w celu korzystania z tej samej struktury danych, co w fetchMany
export default function Bookmarked<T extends { id: number }>() {
  const { bookmarkedItems, isLoading } = useBookmarks();

  const [mediaType, setMediaType] = useState(true);

  //Użycie useMemo do filtrowania zakładek
  const filteredItems = useMemo(
    () =>
      (bookmarkedItems as BookmarkItem[]).filter(
        (item) => item.type === (mediaType ? "movie" : "tv")
      ),
    [bookmarkedItems, mediaType]
  );

  //Tworzenie tablicy URL-i na podstawie zakładek
  //Użycie useMemo do tworzenia tablicy URL-i
  const urls: string[] = useMemo(
    () =>
      filteredItems.map((item) =>
        mediaType ? getMovie(item.id) : getTv(item.id)
      ),
    [filteredItems, mediaType]
  );

  //Użycie useSWR dla tablicy URL-i
  const { data: moviesData, error } = useSWR<T[]>(
    urls.length > 0 ? urls : null,
    () => fetchMany<T>(urls)
  );

  const loading = isLoading || (!moviesData && urls.length > 0 && !error);

  const isEmpty = !isLoading && urls.length === 0;

  return (
    <main>
      <section className={stylesBookmarks["bookmarks"]}>
        <div className={styles["cardsTopic__title-container"]}>
          <h2 className={styles["cardsTopic__title"]}>Bookmarked</h2>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error errorType="error" siteType="normal" redirectLink={false} />
        ) : isEmpty ? (
          <div className={stylesBookmarks["bookmarks__empty"]}>
            <h3>No Bookmarks</h3>
          </div>
        ) : (
          <>
            <div className={stylesBookmarks["bookmarks__buttons-container"]}>
              <button
                onClick={() => setMediaType(true)}
                className="btn --short-with-padding"
              >
                Movies
              </button>
              <button
                onClick={() => setMediaType(false)}
                className="btn --short-with-padding"
              >
                Tv Series
              </button>
            </div>

            <div className={styles["cardsTopic__cards"]}>
              {moviesData?.map((movie) => (
                <Card
                  key={movie.id}
                  movie={movie}
                  mediaType={mediaType ? "movie" : "tv"}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
