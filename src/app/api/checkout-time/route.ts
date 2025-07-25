import { EmailType } from "@/common/enums";
import { postFetcher } from "@/common/fetchers";
import CheckOutTimeModel from "@/model/checkout-time/checkOutTime";
import PropertyModel from "@/model/property/Property";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("per_page") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    const sortType = searchParams.get("sort_type");
    const sortOrder = sortType === "Oldest" ? 1 : -1;

    let propertyIds = [];
    if (search) {
      const properties = await PropertyModel.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");

      propertyIds = properties.map((property) => property._id);
    }

    const query = {
      $or: [
        ...(search ? [{ propertyId: { $in: propertyIds } }] : []),
        {
          "checkOut.time": { $regex: search, $options: "i" },
        },
        {
          "checkOut.period": { $regex: search, $options: "i" },
        },
      ],
    };

    const checkOutTimes = await CheckOutTimeModel.find(query)
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "propertyId",
        select: "name slug",
      });

    const totalCount = await CheckOutTimeModel.countDocuments(query);

    return NextResponse.json({
      data: checkOutTimes,
      meta: {
        code: 1,
        pagination: {
          total: totalCount,
        },
        message: "Check-out times fetched successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({
      meta: {
        data: null,
        code: 0,
        message: "Something went wrong",
      },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const { checkOut, propertyId } = rawBody;

    const data = {
      propertyId,
      checkOut,
    };

    const property = await PropertyModel.findById(propertyId);

    const emailBody = {
      type: EmailType.LATE_CHECKOUT,
      to: process.env.TARGET_EMAIL_LATE_CHECKOUT,
      subject: "Late Check-out Request",
      body: {
        name: property?.name,
        checkOut,
        createdAt: Date?.now().toString(),
      },
    };

    if (!property) {
      return NextResponse.json({
        meta: {
          data: null,
          code: 0,
          message: "Property not found",
        },
      });
    }

    await postFetcher("/send-email", JSON.stringify(emailBody));

    const checkOutTime = await CheckOutTimeModel.create(data);

    return NextResponse.json({
      meta: {
        data: checkOutTime,
        code: 1,
        message: "Check-out time created successfully",
      },
    });
  } catch (error) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "Something went wrong",
      },
    });
  }
}
