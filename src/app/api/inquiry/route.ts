import { connect } from "@/lib/dbConnect";
import InquiryModel from "@/model/inquiry/Inquiry";
import { NextRequest, NextResponse } from "next/server";

connect();

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
    console.log(error);
    return NextResponse.json({
      meta: {
        code: 0,
        message: "An error occurred. Please try again later.",
      },
    });
  }
}
