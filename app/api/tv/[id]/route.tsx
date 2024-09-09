import { NextResponse } from "next/server";
import { getGenreTvByCategoryWithPage } from "@/app/utils/endpoints";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url); //dla przypomnienia np. const searchParams = new URL(request.url).searchParams;
  const { id } = params; // const id = params.id tak dla przypomnienia
  const page = searchParams.get("page") || "1"; //Domyślnie strona pierwsza

  if (!id) {
    return NextResponse.json({ error: "ID is missing" }, { status: 400 });
  }

  try {
    const response = await fetch(getGenreTvByCategoryWithPage(id, page));
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data from TMDb" },
      { status: 500 }
    );
  }
}
