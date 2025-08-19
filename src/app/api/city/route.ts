import PropertyModel from "@/model/property/Property";
import VendorModel from "@/model/vendors/Vendors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const citiesFromProperty = (await PropertyModel.distinct(
      "city"
    )) as string[];
    const citiesFromVendor = (await VendorModel.distinct("cities")) as string[];

    const seen = new Set<string>();
    const uniqueCities: string[] = [];

    const cities = [...citiesFromProperty, ...citiesFromVendor];

    for (const city of cities) {
      if (!city) continue;
      const normalized = city?.trim()?.toLowerCase();
      if (!seen?.has(normalized)) {
        seen?.add(normalized);
        uniqueCities?.push(city?.trim());
      }
    }

    const formatted = uniqueCities?.map((city: string, index: number) => ({
      _id: index + 1,
      name: city,
    }));

    return NextResponse.json({
      data: formatted,
      meta: {
        code: 1,
        message: "Cities fetched successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "An error occurred",
      },
    });
  }
}
