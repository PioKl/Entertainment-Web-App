import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/search.module.scss";
import SearchIcon from "../images/icon-search.svg";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const path = "/search/";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length === 0) {
      return;
    } else {
      router.push(`${path}${query.trim()}?page=1`);
      setQuery("");
    }
  };

  return (
    <>
      <form className={styles.search} onSubmit={handleSearch}>
        <div className={styles["search__input-container"]}>
          <SearchIcon className={styles["search__icon"]} />
          <label className={styles["search__input-label"]}>
            <input
              type="text"
              placeholder="Search for movies or TV series"
              className={styles["search__input"]}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </label>
        </div>
        <button
          className={`btn ${styles["search__button-submit"]}`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
