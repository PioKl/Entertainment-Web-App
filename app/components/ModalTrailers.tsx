import { createPortal } from "react-dom";
import styles from "@/app/styles/modalTrailers.module.scss";
import Image from "next/image";

interface ModalTrailersProps {
  data: {
    trailers: {
      results: any[];
    };
    media: any;
  };
  closeModal: () => void;
}

const ModalTrailers: React.FC<ModalTrailersProps> = ({ data, closeModal }) => {
  const modalHook = document.getElementById("modal-hook");

  if (!modalHook) {
    return null;
  }

  //console.log(data.trailers.results);
  //console.log(data.media);

  return createPortal(
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-image-container"]}
        style={{
          position: "relative",
        }}
      >
        <button
          className={styles["modal-image-container__button"]}
          onClick={closeModal}
        >
          Close
        </button>

        <Image
          src={`https://image.tmdb.org/t/p/w780/${
            data.media.backdrop_path
              ? data.media.backdrop_path
              : data.media.poster_path
          }`}
          alt={data.media.title || data.media.name}
          className={styles["modal__image"]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>
    </div>,
    modalHook
  );
};

export default ModalTrailers;
