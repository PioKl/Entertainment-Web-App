import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "@/app/styles/modalTrailers.module.scss";
import Image from "next/image";
import IconNext from "@/app/images/icon-next.svg";
import IconPlay from "@/app/images/icon-play.svg";
import IconClose from "@/app/images/icon-close.svg";

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
  const [trailerNumber, setTrailerNumber] = useState(0);
  const handlePlayMovie = () => {
    setPlayMovie(!playMovie);
  };

  const handlePreviousTrailer = () => {
    setTrailerNumber((prevId) => {
      const newTrailerNumber =
        (prevId - 1 + data.trailers.results.length) %
        data.trailers.results.length;
      return newTrailerNumber;
    });
  };

  const handleNextTrailer = () => {
    setTrailerNumber((prevId) => {
      const newTrailerNumber = (prevId + 1) % data.trailers.results.length;
      return newTrailerNumber;
    });
  };

  if (!modalHook) {
    return null;
  }

  return createPortal(
    <div tabIndex={0} className={styles["modal"]}>
      <div className={styles["modal__close-modal-button-container"]}>
        <button
          className={`btn-option ${styles["modal__close-modal-button"]}`}
          onClick={closeModal}
        >
          <IconClose className={styles["modal__close-modal-icon"]} />
        </button>
      </div>

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
            allow="fullscreen"
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

        {!playMovie && data.trailers && data.trailers.results.length > 0 && (
          <div
            className={styles["modal__choose-trailer"]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className={`${styles["modal__choose-trailer-button"]} ${styles["--previous"]}`}
              onClick={handlePreviousTrailer}
              onKeyDown={(e) => {
                e.stopPropagation();
                e.key === "Enter" && handlePreviousTrailer;
              }}
            >
              <IconNext />
            </button>
            <span className={styles["modal__choose-trailer-number"]}>
              {trailerNumber + 1} / {data.trailers.results.length}
            </span>
            <button
              className={`${styles["modal__choose-trailer-button"]} ${styles["--next"]}`}
              onClick={handleNextTrailer}
              onKeyDown={(e) => {
                e.stopPropagation();
                e.key === "Enter" && handleNextTrailer;
              }}
            >
              <IconNext />
            </button>
          </div>
        )}

        {data.trailers && data.trailers.results.length > 0 && (
          <div
            className={`${styles["modal__play-video-container"]} ${
              playMovie && styles["--play-active"]
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handlePlayMovie();
            }}
          >
            <div className={styles["modal__play-button-container"]}>
              <button type="button" className={styles["modal__play-button"]}>
                <IconPlay className={styles["modal__play-icon"]} />
                <span className={styles["modal__play-span"]}>Play</span>
              </button>
              <div className={styles["modal__trailer-name-container"]}>
                <span className={styles["modal__trailer-name"]}>
                  {data.trailers.results[trailerNumber].name}
                </span>
              </div>
            </div>
          </div>
        )}

        <div
          className={styles["modal__options-buttons"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {playMovie && data.trailers && data.trailers.results.length > 0 && (
            <button
              type="button"
              className={`btn-option ${styles["modal__close-button"]}`}
              onClick={handlePlayMovie}
            >
              <IconClose className={styles["modal__close-icon"]} />
            </button>
          )}
        </div>
      </div>
    </div>,
    modalHook
  );
};

export default ModalTrailers;
