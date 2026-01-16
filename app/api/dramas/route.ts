import { NextRequest, NextResponse } from "next/server"
import { getDubindoDramas } from "@/lib/api/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const classify = searchParams.get("classify") || "terbaru"
    const page = parseInt(searchParams.get("page") || "1", 10)

    const dramas = await getDubindoDramas({ classify, page })

    return NextResponse.json(dramas)
  } catch (error) {
    console.error("Error fetching dramas:", error)
    return NextResponse.json(
      { error: "Failed to fetch dramas" },
      { status: 500 }
    )
  }
}

