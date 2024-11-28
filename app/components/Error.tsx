import styles from "../styles/error.module.scss";
import Link from "next/link";

interface ErrorProps {
  errorType: "wrongPage" | "error";
  siteType: "normal" | "static";
  redirectLink: true | false;
}

const Error: React.FC<ErrorProps> = ({ errorType, siteType, redirectLink }) => {
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
      {redirectLink ? (
        <>
          <h3 className={styles["error__heading"]}>
            {errorMessages[errorType]}
          </h3>
          <Link className={styles["error__link"]} href="/">
            <span className="btn-more --redirectLink">return to main page</span>
          </Link>
        </>
      ) : (
        <h3 className={styles["error__heading"]}>{errorMessages[errorType]}</h3>
      )}
    </div>
  );
};

export default Error;
