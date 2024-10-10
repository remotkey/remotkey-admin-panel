import { getPropertyById } from "../api/server";
import { PropertyForm } from "./PropertyForm";

export const PropertyFormRSCWrapper = async ({ id }: { id?: string }) => {
  let data = null;

  if (id) {
    const { data: propertyData } = await getPropertyById({ id });
    data = propertyData;
  }

  return <PropertyForm data={data} />;
};
