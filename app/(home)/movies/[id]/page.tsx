import MoviesGenreResult from "./MoviesGenreResult";

type Params = { id: string };

export default function Page(props: { params: Params }) {
  return <MoviesGenreResult params={props.params} />;
}
