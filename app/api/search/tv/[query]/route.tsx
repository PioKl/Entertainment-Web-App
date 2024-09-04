import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1"; //Domyślnie strona pierwsza

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&query=${encodeURIComponent(query)}&page=${page}`
    );
    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
}
