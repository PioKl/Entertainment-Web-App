import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "@/app/styles/modalTrailers.module.scss";
import Image from "next/image";
import IconClose from "@/app/images/icon-close.svg";
import PlayVideo from "./PlayVideo";
import { handlePreviousTrailer, handleNextTrailer } from "../utils/functions";

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

  const [playMovie, setPlayMovie] = useState(false);

  //W projekcie mam kilka sposobów na użycie handleNextTrailer i handlePreviousTrailer. W Card i CardSwiper jest przy użycie hooka useTrailerNavigation
  //Natomiast w ModalTrailers za pomocą funkcji handleNextTrailer i handlePreviousTrailer, po prostu dwa różne sposoby, a efekt będzie ten sam.
  const [trailerNumber, setTrailerNumber] = useState(0);

  const handlePlayMovie = () => {
    setPlayMovie(!playMovie);
  };

  if (!modalHook) {
    return null;
  }

  return createPortal(
    <div
      id="modalId"
      tabIndex={0}
      className={styles["modal"]}
      onKeyDown={(e) => {
        e.key === "Enter" ? handlePlayMovie() : undefined;
        e.key === "Escape" ? closeModal() : undefined;
        e.key === "ArrowRight" &&
          handleNextTrailer(setTrailerNumber, data.trailers.results);
        e.key === "ArrowLeft" &&
          handlePreviousTrailer(setTrailerNumber, data.trailers.results);
      }}
    >
      <div
        className={`${styles["modal__image-container"]} ${
          playMovie && styles["--play-active"]
        }`}
        style={{
          position: "relative",
        }}
      >
        {playMovie && data.trailers.results[0] ? (
          <iframe
            className={styles["modal__iframe"]}
            src={`https://www.youtube.com/embed/${data.trailers.results[trailerNumber].key}?autoplay=1`}
            allow="fullscreen; autoplay"
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></iframe>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original/${
              data.media.backdrop_path
                ? data.media.backdrop_path
                : data.media.poster_path
            }`}
            alt={data.media.title || data.media.name}
            className={styles["modal__image"]}
            fill
            style={{ objectFit: "cover" }}
            priority={true}
          />
        )}
        <PlayVideo
          data={data}
          type="modal"
          playMovie={playMovie}
          setPlayMovie={setPlayMovie}
          trailerNumber={trailerNumber}
          setTrailerNumber={setTrailerNumber}
        />
      </div>
      <div className={styles["modal__close-modal-button-container"]}>
        <button
          className={`btn-option ${styles["modal__close-modal-button"]}`}
          onClick={closeModal}
        >
          <IconClose className={styles["modal__close-modal-icon"]} />
        </button>
      </div>
    </div>,
    modalHook
  );
};

export default ModalTrailers;
