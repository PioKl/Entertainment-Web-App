import { getMediaDetails } from "@/app/utils/routes";
import {
  getMovie,
  getMovieCredits,
  getMovieVideo,
} from "@/app/utils/endpoints";

export const GET = getMediaDetails(getMovie, getMovieCredits, getMovieVideo);
