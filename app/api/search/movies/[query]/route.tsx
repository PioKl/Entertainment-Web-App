import { NextResponse } from "next/server";
import { getSearchMovies } from "@/app/utils/endpoints";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const { searchParams } = new URL(request.url);
  let query;
  const page = searchParams.get("page") || "1"; // Domyślnie strona 1, jeśli brak

  //Dla localhost
  if (process.env.NODE_ENV === "development") {
    query = searchParams.get("query"); //pochodzi z części zapytania (query string) w URL, np. ?query=alien
  }
  //Dla produkcji (czyli NODE_ENV jest production)
  else {
    query = params.query; // params.query, pochodzi z dynamicznego segmentu ścieżki URL w Next.js (dla produkcji w vercel)
  }

  console.log("Query:", query);
  console.log("Page:", page);

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(getSearchMovies(query, page));
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
}
