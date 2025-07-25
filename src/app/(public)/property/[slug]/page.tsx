import { PropertyImage } from "@/common/components/atoms/PropertyImage";
import { SectionSubHeading } from "@/common/components/atoms/SectionSubHeading";
import { CheckInCheckOutPublic } from "@/common/components/molecules/CheckInCheckOutPublic";
import { ContactInterestPrompt } from "@/common/components/molecules/ContactInterestPrompt";
import { LocalNews } from "@/common/components/molecules/LocalNews";
import { TabMenu } from "@/common/components/molecules/TabMenu";
import { PropertyHeader } from "@/common/components/organisms/PropertyHeader";
import { getPropertyById } from "@/main/property/api/server";
import { HospitalMap } from "@/main/property/components/HospitalMap";
import { KeyPoints } from "@/main/property/components/KeyPoints";
import { Weather } from "@/main/property/components/Weather";
import Link from "next/link";
import { notFound } from "next/navigation";
// import { NewsList } from "@/main/components/molecules/NewsList";
export const dynamic = "force-dynamic";

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
        location={data?.location || ""}
      />
      {data?.thumbnail && <PropertyImage thumbnail={data?.thumbnail} />}
      <div className="flex flex-col gap-[1.875rem]">
        <ContactInterestPrompt />
        {data?.thankYouText && (
          <div className="font_reg_8 whitespace-pre-line rounded-r_125 bg-C_F7F7F7 p-6 text-C_0E0E0E">
            {data.thankYouText.split(/(https?:\/\/[^\s]+)/g).map((part, idx) =>
              /https?:\/\/[^\s]+/.test(part) ? (
                <Link
                  key={idx}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-500">
                  {part}
                </Link>
              ) : (
                <span key={idx}>{part}</span>
              )
            )}
          </div>
        )}
        <hr className="border-C_C7C7C7" />
        <section className="grid grid-cols-1 gap-[1.88rem] md:grid-cols-2">
          <KeyPoints title="Key points of this House" values={data?.usp} />
          <KeyPoints title="House Rules" values={data?.houseRules} />
        </section>
        <hr className="border-C_C7C7C7" />
        <CheckInCheckOutPublic
          checkOut={`${data?.checkOut?.time} ${data?.checkOut?.period}`}
          propertyId={id}
        />
        <hr className="border-C_C7C7C7" />
        {data?.location && (
          <div className="flex flex-col gap-[0.9375rem]">
            <SectionSubHeading title="Weather Information" />
            <div className="rounded-r_08125">
              <Weather location={data?.location} />
              {/* <WeatherRange location={data?.location} /> */}
            </div>
          </div>
        )}
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
