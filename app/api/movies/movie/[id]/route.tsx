import { getMovie } from "@/app/utils/endpoints";
import { getMovieCredits } from "@/app/utils/endpoints";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const [media, crew] = await Promise.all([
      fetch(getMovie(id)).then((res) => res.json()),
      fetch(getMovieCredits(id)).then((res) => res.json()),
    ]);

    return NextResponse.json({ media, crew });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
}
