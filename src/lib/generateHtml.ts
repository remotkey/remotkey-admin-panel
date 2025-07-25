import { LateCheckoutPayload, RealEstateFormPayload } from "@/common/types";

export function generateRealEstateFormHtml(
  data: RealEstateFormPayload
): string {
  const subject = data?.subject || "New Inquiry";
  const name = data?.body?.name || "-";
  const email = data?.body?.email || "-";
  const phone = data?.body?.phone || "-";
  const InterestedArea = data?.body?.interestedArea || "-";

  return `
    <div style="max-width:600px; margin:0 auto; font-family:Arial, sans-serif; background:#f9f9f9; border-radius:8px; padding:24px; color:#333;">
      <div style="background:#0e0e0e; color:#ffffff; padding:16px 24px; border-radius:6px 6px 0 0;">
        <h2 style="margin:0; font-size:20px;">${subject}</h2>
      </div>
      <div style="padding:24px; background:#ffffff; border-radius:0 0 6px 6px;">
        <p style="margin:12px 0;"><strong>Name(s):</strong> ${name}</p>
        <p style="margin:12px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin:12px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin:12px 0;"><strong>Interested Area:</strong></p>
        <div style="background:#f0f0f0; padding:12px; border-radius:4px; font-size:14px;">
          ${InterestedArea}
        </div>
      </div>
    </div>
  `;
}

export function generateLateCheckoutHtml(data: LateCheckoutPayload): string {
  const subject = data?.subject || "Late Checkout Request";

  const { name, checkOut, createdAt } = data?.body;
  const formattedDate = new Date(Number(createdAt)).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
    <div style="max-width:600px; margin:0 auto; font-family:Arial, sans-serif; background:#f9f9f9; border-radius:8px; padding:24px; color:#333;">
      <div style="background:#0e0e0e; color:#ffffff; padding:16px 24px; border-radius:6px 6px 0 0;">
        <h2 style="margin:0;">${subject}</h2>
      </div>
      <div style="padding:24px; background:#ffffff; border-radius:0 0 6px 6px;">
        <p style="margin:12px 0;"><strong>Property:</strong> ${name}</p>
        <p style="margin:12px 0;"><strong>Requested Checkout Time:</strong> ${checkOut.time} ${checkOut.period}</p>
        <p style="margin:12px 0;"><strong>Request Received At:</strong> ${formattedDate}</p>
      </div>
    </div>
  `;
}
