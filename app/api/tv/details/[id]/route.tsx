import { getMediaDetails } from "@/app/utils/routes";
import { getTv, getTvCredits, getTvVideo } from "@/app/utils/endpoints";

export const GET = getMediaDetails(getTv, getTvCredits, getTvVideo);
