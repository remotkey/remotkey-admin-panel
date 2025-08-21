import { connect } from "@/lib/dbConnect";
import VendorModel from "@/model/vendors/Vendors";
import { NextRequest, NextResponse } from "next/server";

connect();

// -------------------------------------- Create a vendor --------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    const {
      name,
      cities,
      lat,
      lng,
      description,
      website,
      contactNumber,
      email,
    } = rawBody;

    // -------------------------------------- Create and save the vendor --------------------------------------------
    const newVendor = new VendorModel({
      name,
      cities,
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

// -------------------------------------- Get all vendors --------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const cityParam = searchParams.get("city") || "";
    const id = searchParams.get("_id");

    if (id) {
      const data = await VendorModel.findById(id);
      return NextResponse.json({
        data,
        meta: {
          code: 1,
          message: "Vendor fetched successfully",
        },
      });
    }
    const cities = cityParam
      ?.split(",")
      ?.map((c) => c.trim())
      ?.filter(Boolean);
    const limit = parseInt(searchParams.get("per_page") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;
    const sortType = searchParams.get("sort_type");
    const sortOrder = sortType === "Newest" ? -1 : 1;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (cities?.length) {
      (query as any).cities = {
        $in: cities
          .filter((c) => c?.trim())
          .map((c) => new RegExp(c.trim(), "i")),
      };
    }

    const vendors = await VendorModel.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await VendorModel.countDocuments(query);

    return NextResponse.json({
      data: vendors,
      meta: {
        code: 1,
        message: "Vendors fetched successfully",
        pagination: {
          total,
          page,
          per_page: limit,
          total_pages: Math.ceil(total / limit),
        },
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

// -------------------------------------- Delete Single Vendor --------------------------------------
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const vendor = await VendorModel.findById(id);

  if (!vendor) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "Vendor not found",
      },
    });
  }

  await VendorModel.findByIdAndDelete(id);

  return NextResponse.json({
    meta: {
      code: 1,
      message: "Vendor deleted successfully",
    },
  });
}
