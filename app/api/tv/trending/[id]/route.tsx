import { getMediaByTopicType } from "@/app/utils/routes";
import { getTrendingTv } from "@/app/utils/endpoints";

export const GET = getMediaByTopicType(getTrendingTv);
