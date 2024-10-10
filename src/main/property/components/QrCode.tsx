import { Icon } from "@/lib/next-image/Icon";
import { Download } from "./DownloadQr";

export const QrCode = ({ icon }: { icon: string }) => {
  return (
    <div className="group relative flex max-w-fit rounded-r_0625 bg-white shadow-image_shadow">
      <div className="relative size-28 group-hover:brightness-[0.40]">
        <Icon
          src={icon || ""}
          size={48}
          alt="QR Code"
          className="size-full rounded-r_0625"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Download href={icon || ""} />
      </div>
    </div>
  );
};
