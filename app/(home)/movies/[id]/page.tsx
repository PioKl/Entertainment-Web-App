import MoviesGenreResult from "./MoviesGenreResult";

export default function Page({ params }: { params: { id: string } }) {
  return <MoviesGenreResult params={params} />;
}
