import { getMediaDetails } from "@/app/utils/routes";
import { getTv, getTvCredits } from "@/app/utils/endpoints";

export const GET = getMediaDetails(getTv, getTvCredits);
