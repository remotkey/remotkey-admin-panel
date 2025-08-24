import { connect } from "@/lib/dbConnect";
import VendorModel from "@/model/vendors/Vendors";
import PropertyModel from "@/model/property/Property";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, cities, description, website, contactNumber, email } =
      await request.json();

    const newVendor = await VendorModel.create({
      name,
      cities,
      description,
      website,
      contactNumber,
      email,
    });

    return NextResponse.json({
      data: newVendor,
      meta: { code: 1, message: "Vendor created successfully" },
    });
  } catch (error) {
    return NextResponse.json({
      meta: { code: 0, message: "An error occurred" },
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const cityParam = searchParams.get("city") || "";
    const _id = searchParams.get("_id");
    const propertyId = searchParams.get("propertyId");

    if (_id) {
      const data = await VendorModel.findById(_id);
      return NextResponse.json({
        data,
        meta: { code: 1, message: "Vendor fetched successfully" },
      });
    }

    if (propertyId) {
      // Query vendors that are linked to a specific property
      // First get the property to find vendor IDs
      const property = await PropertyModel.findById(propertyId);

      if (!property || !property.vendors || property.vendors.length === 0) {
        return NextResponse.json({
          data: [],
          meta: { code: 1, message: "No vendors found for this property" },
        });
      }

      // Get vendors by their IDs from the property
      const vendorIds = property.vendors;
      const vendors = await VendorModel.find({
        _id: { $in: vendorIds },
      });

      return NextResponse.json({
        data: vendors,
        meta: { code: 1, message: "Vendors fetched successfully" },
      });
    }

    const cities = cityParam
      .split(",")
      .map((c) => c?.trim())
      .filter(Boolean);

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
      query["cities.name"] = { $in: cities.map((c) => new RegExp(c, "i")) };
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
      meta: { code: 0, message: "An error occurred" },
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { _id, name, cities, description, website, contactNumber, email } =
      await request.json();

    if (!_id) {
      return NextResponse.json({
        meta: { code: 0, message: "Vendor ID is required" },
      });
    }

    const updatedVendor = await VendorModel.findByIdAndUpdate(
      _id,
      {
        name,
        cities,
        description,
        website,
        contactNumber,
        email,
      },
      { new: true }
    );

    if (!updatedVendor) {
      return NextResponse.json({
        meta: { code: 0, message: "Vendor not found" },
      });
    }

    return NextResponse.json({
      data: updatedVendor,
      meta: { code: 1, message: "Vendor updated successfully" },
    });
  } catch (error) {
    return NextResponse.json({
      meta: { code: 0, message: "An error occurred" },
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) throw new Error("Vendor ID is required");

    const vendor = await VendorModel.findById(id);
    if (!vendor) {
      return NextResponse.json({
        meta: { code: 0, message: "Vendor not found" },
      });
    }

    // Remove vendor ID from all properties that reference it
    await PropertyModel.updateMany({ vendors: id }, { $pull: { vendors: id } });

    // Delete the vendor
    await VendorModel.findByIdAndDelete(id);

    return NextResponse.json({
      meta: {
        code: 1,
        message:
          "Vendor deleted successfully and removed from all linked properties",
      },
    });
  } catch (error) {
    return NextResponse.json({
      meta: { code: 0, message: "An error occurred" },
    });
  }
}
