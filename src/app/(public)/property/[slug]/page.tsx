import { PropertyImage } from "@/common/components/atoms/PropertyImage";
import { SectionSubHeading } from "@/common/components/atoms/SectionSubHeading";
import { CheckInCheckOut } from "@/common/components/molecules/CheckInCheckOut";
import { ContactInterestPrompt } from "@/common/components/molecules/ContactInterestPrompt";
import { LocalNews } from "@/common/components/molecules/LocalNews";
import { TabMenu } from "@/common/components/molecules/TabMenu";
import { PropertyHeader } from "@/common/components/organisms/PropertyHeader";
import { getPropertyById } from "@/main/property/api/server";
import { HospitalMap } from "@/main/property/components/HospitalMap";
import { KeyPoints } from "@/main/property/components/KeyPoints";
import { Weather } from "@/main/property/components/Weather";
import { notFound } from "next/navigation";
// import { NewsList } from "@/main/components/molecules/NewsList";

export default async function PropertyPage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  const { data } = await getPropertyById({ id });
  !data && notFound();

  return (
    <div className="mx-auto flex max-w-[90vw] flex-col">
      <PropertyHeader
        name={data?.name}
        bookingPageLink={data?.bookingPageLink}
        location={data?.location}
      />
      <PropertyImage thumbnail={data?.thumbnail} />
      <div className="flex flex-col gap-[1.875rem]">
        <ContactInterestPrompt />
        <div className="font_reg_8 rounded-r_125 bg-C_F7F7F7 p-6 text-C_0E0E0E">
          {data?.thankYouText}
        </div>
        <hr className="border-C_C7C7C7" />
        <section className="grid grid-cols-1 gap-[1.88rem] md:grid-cols-2">
          <KeyPoints title="Key points of this House" values={data?.usp} />
          <KeyPoints title="House Rules" values={data?.houseRules} />
        </section>
        <hr className="border-C_C7C7C7" />
        <CheckInCheckOut
          checkIn={`${data?.checkIn?.time} ${data?.checkIn?.period}`}
          checkOut={`${data?.checkOut?.time} ${data?.checkOut?.period}`}
        />
        <hr className="border-C_C7C7C7" />
        <div className="flex flex-col gap-[0.9375rem]">
          <SectionSubHeading title="Weather information" />
          <div className="rounded-r_08125">
            <Weather placeName={data?.location} />
          </div>
        </div>
        <TabMenu data={data} />
        <div className="flex flex-col gap-[0.9375rem]">
          <SectionSubHeading title="Hospital / Urgent care near me" />
          <HospitalMap hospitals={data?.hospitals} />
        </div>
        <LocalNews />
      </div>
    </div>
  );
}
