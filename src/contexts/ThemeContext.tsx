import {
  type ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

const ThemeContext = createContext<ThemeProviderValue | null>(null);

type Theme = "light" | "dark";
interface ThemeProviderValue {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const ThemeProviderValue: ThemeProviderValue = {
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={ThemeProviderValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined || context === null)
    throw new Error("ThemeContext was used outside ThemeContextProvider");
  return context;
};
