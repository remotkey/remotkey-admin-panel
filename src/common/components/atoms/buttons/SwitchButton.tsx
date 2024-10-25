import { Switch } from "@headlessui/react";
import { useState, useCallback } from "react";

interface SwitchButtonProps {
  id: string;
  onChange: (value: boolean) => void;
}

export const SwitchButton = ({ id, onChange }: SwitchButtonProps) => {
  const [enabled, setEnabled] = useState(false);

  const handleChange = useCallback(() => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange(newValue);
  }, [enabled, onChange]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="font_med_8 text-black">Regenerate QR Code</span>
        <Switch
          checked={enabled}
          onChange={handleChange}
          className="group relative flex h-[1.6rem] w-[2.80rem] cursor-pointer items-center rounded-full border border-C_309B5F p-1 transition-colors duration-200 ease-in-out hover:shadow-none focus:outline-none data-[checked]:bg-C_309B5F data-[focus]:outline-1">
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-[20px] translate-x-[-2px] rounded-full bg-C_309B5F shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-[1.094rem] group-data-[checked]:bg-white"
          />
        </Switch>
      </div>
    </>
  );
};
