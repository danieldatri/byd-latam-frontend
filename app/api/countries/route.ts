import { NextResponse } from "next/server"
import { getAllCountries } from "@/lib/sanity"

export async function GET() {
  try {
    const countries = await getAllCountries()
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching countries" }, { status: 500 })
  }
}

