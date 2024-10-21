import { connect } from "@/lib/dbConnect";
import InquiryModel from "@/model/inquiry/Inquiry";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.formData();

    const name = rawBody.get("name") as string;
    const email = rawBody.get("email") as string;
    const phone = rawBody.get("phone") as string;
    const interestedArea = rawBody.get("interestedArea") as string;

    if (!name || !email || !phone || !interestedArea) {
      return NextResponse.json({
        meta: {
          code: 0,
          message: "Please fill all the fields",
        },
      });
    }

    const data = {
      name,
      email,
      phone,
      interestedArea,
    };

    await InquiryModel.create(data);

    return NextResponse.json({
      meta: {
        code: 1,
        message:
          "Thank you for your interest! Our team will get back to you in next 24 hours",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
