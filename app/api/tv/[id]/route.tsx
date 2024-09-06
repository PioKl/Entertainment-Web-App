import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1"; //Domyślnie strona pierwsza

  if (!id) {
    return NextResponse.json({ error: "ID is missing" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&include_adult=false&with_genres=${encodeURIComponent(
        id
      )}&language=en-US&sort_by=popularity.desc&page=${page}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
}
