import styles from "../styles/loader.module.scss";

export default function Loader() {
  return (
    <div className={styles["loader"]}>
      <div className={styles["loader__spinner"]}></div>
    </div>
  );
}
