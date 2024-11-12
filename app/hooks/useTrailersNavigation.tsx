import { useState } from "react";

export const useTrailerNavigation = (data: any[]) => {
  const [trailerNumber, setTrailerNumber] = useState(0);

  const handlePreviousTrailer = () => {
    setTrailerNumber((prevId: number) => {
      const newTrailerNumber = (prevId - 1 + data.length) % data.length;
      return newTrailerNumber;
    });
  };

  const handleNextTrailer = () => {
    setTrailerNumber((prevId: number) => {
      const newTrailerNumber = (prevId + 1) % data.length;
      return newTrailerNumber;
    });
  };

  return {
    trailerNumber,
    setTrailerNumber,
    handleNextTrailer,
    handlePreviousTrailer,
  };
};
