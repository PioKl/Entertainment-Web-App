import styles from "../styles/search.module.scss";
import SearchIcon from "../images/icon-search.svg";

export default function Search() {
  return (
    <>
      <form className={styles.search} action="">
        <div className={styles["search__input-container"]}>
          <SearchIcon className={styles["search__icon"]} />
          <input
            type="text"
            placeholder="Search for movies or TV series"
            className={styles["search__input"]}
          />
        </div>
        <button className={styles["search__button-submit"]} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
