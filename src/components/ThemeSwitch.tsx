import { Switch } from "@nextui-org/react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";
import { useTheme } from "../contexts/ThemeContext";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  function handleSelectChange(status: boolean) {
    console.log(status);
    const theme = status ? "dark" : "light";
    setTheme(theme);
  }

  return (
    <Switch
      isSelected={theme === "dark" ? true : false}
      onValueChange={handleSelectChange}
      size="sm"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    ></Switch>
  );
};

export default ThemeSwitch;
