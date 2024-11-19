import { NextResponse } from "next/server";

export function getMediaBySearch(
  fetchFunction: (query: string, page: string, mediaType: string) => string
) {
  return async function GET(
    request: Request,
    { params }: { params: { query: string } }
  ) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Ustawienie mediaType na podstawie ścieżki
    let mediaType = "all";
    if (pathname.includes("/movies/")) {
      mediaType = "movie";
    } else if (pathname.includes("/tv/")) {
      mediaType = "tv";
    }

    const query = params.query; // Parametr query z dynamicznej ścieżki
    const page = url.searchParams.get("page") || "1"; // Strona 1, jeśli brak

    console.log("Query:", query);
    console.log("Media Type:", mediaType);
    console.log("Page:", page);

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is missing" },
        { status: 400 }
      );
    }

    try {
      const response = await fetch(fetchFunction(query, page, mediaType));
      const data = await response.json();

      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching data from TMDb" },
        { status: 500 }
      );
    }
  };
}

export function getMediaByTopicType(fetchFunction: (page: string) => string) {
  //fetchFunction - funkcja przyjmuje stringa w postaci parametru page i zwraca stringa
  return async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const page = params.id || "1"; // Pobiera numer strony z URL

    try {
      const response = await fetch(fetchFunction(page));
      const data = await response.json();

      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching data from TMDb" },
        { status: 500 }
      );
    }
  };
}

export function getMediaDetails(
  fetchFunctionMedia: (id: string) => string,
  fetchFunctionCrew: (id: string) => string,
  fetchFunctionTrailers: (id: string) => string
) {
  return async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;

    try {
      const [media, crew, trailers] = await Promise.all([
        fetch(fetchFunctionMedia(id)).then((res) => res.json()),
        fetch(fetchFunctionCrew(id)).then((res) => res.json()),
        fetch(fetchFunctionTrailers(id)).then((res) => res.json()),
      ]);
      return NextResponse.json({ media, crew, trailers });
    } catch (error) {
      return NextResponse.json(
        { error: "error fetching data from TMdb" },
        { status: 500 }
      );
    }
  };
}
