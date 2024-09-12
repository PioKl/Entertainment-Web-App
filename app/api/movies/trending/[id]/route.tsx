import { getMediaByTopicType } from "@/app/utils/routes";
import { getTrendingMovies } from "@/app/utils/endpoints";

export const GET = getMediaByTopicType(getTrendingMovies);
