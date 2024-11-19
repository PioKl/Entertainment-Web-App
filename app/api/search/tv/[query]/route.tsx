import { NextResponse } from "next/server";
import { getSearchTv } from "@/app/utils/endpoints";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const query = params.query;
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1"; // Domyślnie strona 1, jeśli brak

  console.log("Query:", query);
  console.log("Page:", page);

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(getSearchTv(query, page));
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
}
//wersja dla local
/* export async function GET(request: Request) {
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
    const response = await fetch(getSearchTv(query, page));
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
} */
