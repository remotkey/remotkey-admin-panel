import VendorModel from "@/model/vendors/Vendors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    const { name, city, lat, lng, description, website, contactNumber, email } =
      rawBody;

    // -------------------------------------- Create and save the vendor --------------------------------------------
    const newVendor = new VendorModel({
      name,
      city,
      lat,
      lng,
      description,
      website,
      contactNumber,
      email,
    });

    const saveVendor = await newVendor.save();

    await saveVendor.save();

    return NextResponse.json({
      data: saveVendor,
      meta: {
        code: 1,
        message: "Vendor created successfully",
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
