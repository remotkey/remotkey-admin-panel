import { QRCard } from "@/common/components/atoms/QRCard";
import { notFound } from "next/navigation";

const BasePath = "https://remotkey.sfo2.digitaloceanspaces.com/properties/";

const qrCodePage = ({ searchParams }: { searchParams: any }) => {
  const QrPath = BasePath + searchParams?.qr;
  if (!searchParams?.qr) {
    notFound();
  }
  return (
    <div className="flex items-center justify-center pt-20">
      <QRCard imagePath={QrPath} />
    </div>
  );
};

export default qrCodePage;
