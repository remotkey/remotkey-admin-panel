export const FormInputErrorMessage = ({
  text,
}: {
  text: string | undefined;
}) => {
  return (
    <span className="text-xs text-start font-medium text-red-600">{text}</span>
  );
};
