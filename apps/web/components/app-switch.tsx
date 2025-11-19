"use client";

import { Button } from "./ui/button";
import { SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function SwitchMode() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="bg-background text-primary hover:bg-background cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunMoonIcon />
    </Button>
  );
}
