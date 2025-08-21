import { getVendorById } from "../api/actions";
import { VendorForm } from "./VendorForm";

export const VendorFormRSCWrapper = async ({ id }: { id?: string }) => {
  let data = null;

  if (id) {
    const { data: VendorData } = await getVendorById({ id });
    data = VendorData;
  }

  return <VendorForm data={data!} />;
};
