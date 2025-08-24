import { getVendorById } from "../api/actions";
import { VendorFormMultiple } from "./VendorFormMultiple";

export const VendorFormRSCWrapper = async ({ id }: { id?: string }) => {
  let data = null;

  if (id) {
    const { data: VendorData } = await getVendorById({ id });
    data = VendorData;
  }

  return <VendorFormMultiple data={data!} />;
};
