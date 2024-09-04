import SearchResults from "@/app/components/SearchResults";

export default function TvSearchResult({
  params,
}: {
  params: { query: string };
}) {
  return (
    <>
      <SearchResults params={params} searchType="tv" />
    </>
  );
}
