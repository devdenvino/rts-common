import { ColorSchemePicker } from "@/components/shared/theme/color-scheme-picker";

export function ThemeColorToggle() {
  return (
    <ColorSchemePicker
      variant="outline"
      size="icon"
      aria-label="Select color scheme"
    />
  );
}
