import { PropertyFormRSCWrapper } from "@/main/property/components/PropertyFormRSCWrapper";
export const dynamic = "force-dynamic";

export default function EditPropertyPage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  return <PropertyFormRSCWrapper id={id} />;
}
