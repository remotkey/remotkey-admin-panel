import { VendorFormRSCWrapper } from "@/main/vendor/components/VendorFormRSCWrapper";
export const dynamic = "force-dynamic";

export default function EditVendorPage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  return <VendorFormRSCWrapper id={id} />;
}
