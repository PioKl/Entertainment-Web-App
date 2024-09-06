import SearchResults from "@/app/components/SearchResults";

export default function MoviesSearchResult({
  params,
}: {
  params: { query: string };
}) {
  return (
    <>
      <SearchResults params={params} searchType="movie" />
    </>
  );
}