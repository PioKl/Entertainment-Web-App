import MoviesGenreResult from "./MoviesGenreResult";

export default async function Page({ params }: { params: { id: string } }) {
  return <MoviesGenreResult params={params} />;
}
