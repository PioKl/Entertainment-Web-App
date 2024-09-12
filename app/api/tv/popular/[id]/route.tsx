import { getMediaByTopicType } from "@/app/utils/routes";
import { getPopularTv } from "@/app/utils/endpoints";

export const GET = getMediaByTopicType(getPopularTv);
