import { Button, DarkThemeToggle, useThemeMode } from "flowbite-react";
import { SystemIcons } from "./Icons";

export const ToggleTheme = () => {
  const { mode, setMode } = useThemeMode();

  let themeDisplay = "";
  if (mode === "auto") themeDisplay = "Mismo del Sistema";
  if (mode === "dark") themeDisplay = "Modo Oscuro";
  if (mode === "light") themeDisplay = "Modo Claro";

  return (
    <div className="flex items-center justify-center gap-4">
      <h1>{themeDisplay}</h1>
      <DarkThemeToggle />
      <Button color="light" onClick={() => setMode("auto")}>
        <SystemIcons />
      </Button>
    </div>
  );
};
