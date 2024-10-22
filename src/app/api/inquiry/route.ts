import { connect } from "@/lib/dbConnect";
import InquiryModel from "@/model/inquiry/Inquiry";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("per_page") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    const sortType = searchParams.get("sort_type");
    const sortOrder = sortType === "Newest" ? -1 : 1;

    const query = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const data = await InquiryModel.find(query)
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip(skip);

    const totalCount = await InquiryModel.countDocuments(query);

    return NextResponse.json({
      data,
      meta: {
        code: 1,
        pagination: {
          total: totalCount,
        },
        message: "Inquiry fetched successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({
      meta: {
        data: null,
        code: 0,
        message: "An error occurred. Please try again later.",
      },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    const { fullName, email, phone, interestedArea } = rawBody;

    if (!fullName || !email || !phone || !interestedArea) {
      return NextResponse.json({
        meta: {
          data: null,
          code: 0,
          message: "Please fill all the fields",
        },
      });
    }

    const data = {
      fullName,
      email,
      phone,
      interestedArea,
    };

    await InquiryModel.create(data);

    return NextResponse.json({
      meta: {
        data: null,
        code: 1,
        message:
          "Thank you for your interest! Our team will get back to you in next 24 hours",
      },
    });
  } catch (error) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "An error occurred. Please try again later.",
      },
    });
  }
}
