import { NextResponse } from "next/server";

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
