import { Button } from "../atoms/Button";

export const LocalNews = () => {
  return (
    <div className="flex items-center justify-between rounded-r_08125 border bg-white p-4">
      <div className="flex flex-col">
        <p className="font_bold_7">Local News</p>
        <p className="mt-2 text-gray-600">
          Stay updated with the latest news from your local area.
        </p>
      </div>
      <Button
        text="Read More"
        hasBgColor
        isNewTab
        url="https://www.vaildaily.com/"
      />
    </div>
  );
};
