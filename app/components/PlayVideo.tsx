import { useState } from "react";
import styles from "@/app/styles/playVideo.module.scss";
import "../styles/playVideo.scss";
import IconNext from "@/app/images/icon-next.svg";
import IconPlay from "@/app/images/icon-play.svg";
import IconClose from "@/app/images/icon-close.svg";

interface PlayVideoProps {
  data:
    | Array<any>
    | {
        trailers: {
          results: any[];
        };
      };
  type: "card" | "card-swiper" | "modal";
  playMovie: boolean;
  trailerNumber: number;
  setPlayMovie: React.Dispatch<React.SetStateAction<boolean>>;
  setTrailerNumber: React.Dispatch<React.SetStateAction<number>>;
}

const PlayVideo: React.FC<PlayVideoProps> = ({
  data,
  type,
  playMovie,
  trailerNumber,
  setPlayMovie,
  setTrailerNumber,
}) => {
  function checkDataTrailersLength(data: PlayVideoProps["data"]): number {
    return Array.isArray(data)
      ? data.length
      : data?.trailers?.results?.length || 0; // Zwróć długość lub 0, jeśli undefined

    //Na początku sprawdzi, czy data jest tablicą jeśli tak to wtedy zwraca data.length
    //data?.trailers?.results?.length - wyjaśnienie
    //data?.trailers - sprawdzi czy data jest zdefiniowane i ma właściwość trailers
    //data?.trailers?.results - to samo co powyżej tylko dodatkowo sprawdzi, czy ma wlaściwość results
    //data?.trailers?.results?.length - tak jak powyżej, dodatkowo sprawdzi czy istnieje length przy results
    //Jeśli będzie undefined to zwróci 0 (ze względu na :number)
  }
  //Poniżej trochę inne rozwiązanie
  function checkData(data: PlayVideoProps["data"]) {
    if (Array.isArray(data)) {
      return data; // Zwraca tablicę, jeśli data jest tablicą
    } else if (data.trailers && data.trailers.results) {
      return data.trailers.results; // Zwraca results, jeśli data jest obiektem
    }
    return []; // Zwraca pustą tablicę, jeśli żadne z powyższych nie pasuje
  }

  const handlePlayMovie = () => {
    setPlayMovie(!playMovie);
  };

  const handlePreviousTrailer = () => {
    setTrailerNumber((prevId) => {
      const newTrailerNumber =
        (prevId - 1 + checkDataTrailersLength(data)) %
        checkDataTrailersLength(data);
      return newTrailerNumber;
    });
  };

  const handleNextTrailer = () => {
    setTrailerNumber((prevId) => {
      const newTrailerNumber = (prevId + 1) % checkDataTrailersLength(data);
      return newTrailerNumber;
    });
  };

  const [isChooseTrailerFocused, setIsChooseTrailerFocused] = useState(false);

  return (
    <>
      {!playMovie && checkDataTrailersLength(data) > 0 && (
        <div
          className={styles["video__choose-trailer"]}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onFocus={() => {
            setIsChooseTrailerFocused(true);
          }}
          onBlur={() => {
            setIsChooseTrailerFocused(false);
          }}
          onMouseLeave={() => {
            setIsChooseTrailerFocused(false);
          }}
        >
          <button
            className={`${styles["video__choose-trailer-button"]} ${styles["--previous"]}`}
            onClick={handlePreviousTrailer}
            onKeyDown={(e) => {
              e.stopPropagation();
              e.key === "ArrowLeft" && handlePreviousTrailer();
            }}
          >
            <IconNext />
          </button>
          <span className={styles["video__choose-trailer-number"]}>
            {trailerNumber + 1} / {checkDataTrailersLength(data)}
          </span>
          <button
            className={`${styles["video__choose-trailer-button"]} ${styles["--next"]}`}
            onClick={handleNextTrailer}
            onKeyDown={(e) => {
              e.stopPropagation();
              //e.key === "Enter" && handleNextTrailer;
              e.key === "ArrowRight" && handleNextTrailer();
            }}
          >
            <IconNext />
          </button>
        </div>
      )}
      {checkDataTrailersLength(data) > 0 && (
        <div
          className={`video__play-video-container ${
            playMovie && "--play-active"
          } ${isChooseTrailerFocused && "--focused"}`}
          onClick={(e) => {
            e.stopPropagation();
            handlePlayMovie();
          }}
        >
          <div className={styles["video__play-button-container"]}>
            <button type="button" className={styles["video__play-button"]}>
              <IconPlay
                className={`${styles["video__play-icon"]} ${
                  type === "modal" && styles["--modal"]
                }`}
              />
              <span
                className={`${styles["video__play-span"]} ${
                  type === "modal" && styles["--modal"]
                }`}
              >
                Play
              </span>
            </button>
            {type === "modal" ? (
              <div className={styles["video__trailer-name-container"]}>
                <span className={styles["video__trailer-name-modal"]}>
                  {checkData(data)[trailerNumber].name}
                </span>
              </div>
            ) : (
              <span className={styles["video__trailer-name"]}>
                {checkData(data)[trailerNumber].name}
              </span>
            )}
          </div>
        </div>
      )}
      <div
        className={styles["video__options-buttons"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {playMovie && checkDataTrailersLength(data) > 0 && (
          <button
            type="button"
            className={`btn-option ${styles["video__close-button"]}`}
            onClick={handlePlayMovie}
          >
            <IconClose className={styles["video__close-icon"]} />
          </button>
        )}
      </div>
    </>
  );
};

export default PlayVideo;
