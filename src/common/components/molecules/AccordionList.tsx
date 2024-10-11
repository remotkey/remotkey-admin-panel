import { FormValues } from "@/main/property/components/PropertyForm";
import { LOCATION_EXTRA_INFO } from "@/main/property/constants";
import { LatLng } from "@/main/property/interfaces";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiChevronDown, HiChevronUp, HiTrash } from "react-icons/hi";
import { TiPlus } from "react-icons/ti";
import { InputContainer } from "../atoms/InputContainer";
import { Textarea } from "@headlessui/react";

interface ListInterface {
  fields: LatLng[];
  handleRemoveItem: (index: number) => void;
  text: string;
  name: keyof FormValues;
}

export const AccordionList = ({
  fields,
  handleRemoveItem,
  text,
  name,
}: ListInterface) => {
  const [isOpen, setIsOpen] = useState(true);
  const [extraInfoVisible, setExtraInfoVisible] = useState<number[]>([]);

  const { setValue, trigger } = useFormContext<FormValues>();

  useEffect(() => {
    if (fields.length > 0) {
      setIsOpen(true);
      const oldValues = fields.map((item, index) => {
        // @ts-ignore
        setValue(`${name}.${index}`, item);
        return item;
      });
      setValue(name, oldValues);
    }
  }, [fields, name, setValue]);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleFieldChange = (index: number, key: string, value: string) => {
    // @ts-ignore
    setValue(`${name}.${index}.${key}`, value);
    // @ts-ignore
    trigger(`${name}.${index}.${key}`);
  };

  const handleAddInformation = (index: number) => {
    if (extraInfoVisible.includes(index)) {
      setExtraInfoVisible(extraInfoVisible.filter((i) => i !== index));
    } else {
      setExtraInfoVisible([...extraInfoVisible, index]);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-C_F7F7F7 bg-gray-100">
      <h3
        className="flex cursor-pointer items-center justify-between rounded-lg bg-C_F7F7F7 px-4 py-3 transition-colors"
        onClick={toggleList}>
        <span className="text-base font-medium">{text}</span>
        <span className="text-gray-600">
          {isOpen ? <HiChevronUp /> : <HiChevronDown />}
        </span>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}>
        <ul className="space-y-2 rounded-b-lg bg-white px-4 py-3">
          {fields.map((field, index) => (
            <li key={index} className="flex flex-col space-y-2 text-gray-800">
              <div className="flex items-center justify-between">
                <span>{field.place}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center text-C_5EBE76 transition-colors hover:text-C_5EBE76 hover:shadow-none"
                    onClick={() => handleAddInformation(index)}>
                    <TiPlus className="mr-1" />
                    Extra Information
                  </button>
                  <button
                    type="button"
                    className="flex items-center text-red-500 transition-colors hover:text-red-600 hover:shadow-none"
                    onClick={() => handleRemoveItem(index)}>
                    <HiTrash className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
              {extraInfoVisible.includes(index) && (
                <div className="space-y-2 pt-2">
                  {LOCATION_EXTRA_INFO?.map((item) => (
                    <InputContainer
                      key={item.name}
                      // inputLabel={field.label}
                      isMandatory={item.isMandatory || false}>
                      {item.type === "textarea" ? (
                        <Textarea
                          className="block w-full resize-none rounded-lg border-none"
                          placeholder={item.placeholder}
                          rows={3}
                          onChange={(event) =>
                            handleFieldChange(
                              index,
                              item.name,
                              event.target.value
                            )
                          }>
                          {field[item.name as keyof typeof field] || ""}
                        </Textarea>
                      ) : (
                        <input
                          type="text"
                          className="block w-full rounded-lg border-none px-2 py-1"
                          placeholder={item.placeholder}
                          // @ts-ignore
                          defaultValue={
                            field[item.name as keyof typeof field] || ""
                          }
                          onChange={(event) =>
                            handleFieldChange(
                              index,
                              item.name,
                              event.target.value
                            )
                          }
                        />
                      )}
                    </InputContainer>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
