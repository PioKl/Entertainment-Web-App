export const handlePreviousTrailer = (
  setTrailerNumber: React.Dispatch<React.SetStateAction<number>>,
  data: any[]
) => {
  setTrailerNumber((prevId: number) => {
    const newTrailerNumber = (prevId - 1 + data.length) % data.length;
    return newTrailerNumber;
  });
};

export const handleNextTrailer = (
  setTrailerNumber: React.Dispatch<React.SetStateAction<number>>,
  data: any[]
) => {
  setTrailerNumber((prevId: number) => {
    const newTrailerNumber = (prevId + 1) % data.length;
    return newTrailerNumber;
  });
};
