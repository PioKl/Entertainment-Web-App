import SearchResults from "@/app/components/SearchResults";

export default function SearchResult({
  params,
}: {
  params: { query: string };
}) {
  return (
    <>
      <SearchResults params={params} searchType="all" />
    </>
  );
}
