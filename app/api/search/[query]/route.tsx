import { getMediaBySearch } from "@/app/utils/routes";
import { getSearchAll } from "@/app/utils/endpoints";

export const GET = getMediaBySearch(getSearchAll);
