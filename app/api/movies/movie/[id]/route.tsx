import { getMediaDetails } from "@/app/utils/routes";
import { getMovie, getMovieCredits } from "@/app/utils/endpoints";

export const GET = getMediaDetails(getMovie, getMovieCredits);
