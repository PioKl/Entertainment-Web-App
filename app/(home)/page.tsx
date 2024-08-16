import styles from "../styles/page.module.scss";
import Search from "../components/Search";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ad
          debitis aut dolores dicta.
        </p>
      </div>
    </main>
  );
}
