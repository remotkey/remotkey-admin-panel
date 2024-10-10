import Link from "next/link";

export const SubHeading = ({ text }: { text: string }) => {
  return (
    <div className="font_med_9 md:font_reg_7 leading-6 text-C_9F9F9F">
      <Link
        href={`https://www.google.com/maps/place/${encodeURIComponent(text)}`}
        target="_blank"
        className="hover:!shadow-none">
        {text}
      </Link>
    </div>
  );
};
