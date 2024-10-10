import { PropertyFormRSCWrapper } from "@/main/property/components/PropertyFormRSCWrapper";

export default function EditPropertyPage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  return <PropertyFormRSCWrapper id={id} />;
}
