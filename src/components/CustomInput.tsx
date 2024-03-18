import { Input, type InputProps } from "@nextui-org/react";
import { EyeFilledIcon } from "./../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./../icons/EyeSlashFilledIcon";
import { useState } from "react";

interface CustomInputParams {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  id: string;
  onVlaueChange?: ((value: string) => void) | undefined;
  isPasswordInput?: boolean;
  isNewPassword?: boolean;
}

const CustomInput = ({
  id,
  isPasswordInput = false,
  isNewPassword = false,
  ...otherProps
}: CustomInputParams & InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  if (isPasswordInput) {
    return (
      <Input
        classNames={{
          label: "right-0 text-lg",
          input: "pr-0 pl-[24px]",
        }}
        isRequired
        variant="bordered"
        className="max-w-xs"
        id="password"
        name="password"
        labelPlacement="outside"
        autoComplete={isNewPassword ? "new-password" : "current-password"}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        {...otherProps}
      />
    );
  }

  return (
    <Input
      classNames={{
        label: "right-0 text-lg",
        clearButton: "left-[12px] right-auto",
        input: "pr-0",
      }}
      id={id}
      name={id}
      variant="bordered"
      className="max-w-xs"
      labelPlacement="outside"
      {...otherProps}
    />
  );
};

export default CustomInput;
