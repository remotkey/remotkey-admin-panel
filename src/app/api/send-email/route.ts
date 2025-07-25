import { EmailType } from "@/common/enums";
import {
  generateLateCheckoutHtml,
  generateRealEstateFormHtml,
} from "@/lib/generateHtml";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    const type: EmailType = data?.type;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailHtmlContent =
      type === EmailType.LATE_CHECKOUT
        ? generateLateCheckoutHtml(data)
        : generateRealEstateFormHtml(data);

    await transporter.sendMail({
      from: `"Welcome Home | Remotkey" <remotkeyonboarding@gmail.com>`,
      to: data?.to,
      subject: data?.subject,
      html: mailHtmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
