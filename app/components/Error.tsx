import styles from "../styles/error.module.scss";

interface ErrorProps {
  errorType: "wrongPage" | "error";
  siteType: "normal" | "static";
}

const Error: React.FC<ErrorProps> = ({ errorType, siteType }) => {
  const errorMessages: Record<ErrorProps["errorType"], string> = {
    wrongPage: "Sorry wrong page, nothing here",
    error: "Something went wrong",
  };

  return (
    <div
      className={`${styles.error} ${
        siteType === "static" && styles["--static"]
      }`}
    >
      <h3 className={styles["error__heading"]}>{errorMessages[errorType]}</h3>
    </div>
  );
};

export default Error;
