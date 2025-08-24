import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import PropertyModel from "@/model/property/Property";
import VendorModel from "@/model/vendors/Vendors";
import InquiryModel from "@/model/inquiry/Inquiry";
import CheckOutTimeModel from "@/model/checkout-time/checkOutTime";

connect();

export async function GET() {
  try {
    // Get counts for all entities
    const [
      propertiesCount,
      vendorsCount,
      inquiriesCount,
      checkoutRequestsCount,
    ] = await Promise.all([
      PropertyModel.countDocuments(),
      VendorModel.countDocuments(),
      InquiryModel.countDocuments(),
      CheckOutTimeModel.countDocuments(),
    ]);

    console.log("Dashboard stats counts:", {
      properties: propertiesCount,
      vendors: vendorsCount,
      inquiries: inquiriesCount,
      checkoutRequests: checkoutRequestsCount,
    });

    return NextResponse.json({
      data: {
        properties: propertiesCount,
        vendors: vendorsCount,
        inquiries: inquiriesCount,
        checkoutRequests: checkoutRequestsCount,
      },
      meta: {
        code: 1,
        message: "Dashboard stats fetched successfully",
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);

    // Return more detailed error information
    return NextResponse.json({
      data: {
        properties: 0,
        vendors: 0,
        inquiries: 0,
        checkoutRequests: 0,
      },
      meta: {
        code: 0,
        message: `Failed to fetch dashboard stats: ${error instanceof Error ? error.message : "Unknown error"}`,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
}
