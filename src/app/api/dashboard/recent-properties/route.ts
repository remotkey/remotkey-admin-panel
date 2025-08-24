import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import PropertyModel from "@/model/property/Property";

connect();

export async function GET() {
  try {
    // Get 5 most recent properties
    const recentProperties = await PropertyModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("id name slug city location createdAt");

    return NextResponse.json({
      data: recentProperties,
      meta: {
        code: 1,
        message: "Recent properties fetched successfully",
      },
    });
  } catch (error) {
    console.error("Error fetching recent properties:", error);
    return NextResponse.json({
      data: [],
      meta: {
        code: 0,
        message: "Failed to fetch recent properties",
      },
    });
  }
}
