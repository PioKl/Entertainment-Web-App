import { getMediaByTopicType } from "@/app/utils/routes";
import { getPopularMovies } from "@/app/utils/endpoints";

export const GET = getMediaByTopicType(getPopularMovies);
