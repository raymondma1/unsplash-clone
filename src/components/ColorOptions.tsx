import { Button } from "@/components/ui/button";
import { ColorId } from "unsplash-js";

const colorOptions: ColorId[] = [
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue",
];

interface ColorFilterProps {
  selectedColor: ColorId | null;
  onColorSelect: (color: ColorId | null) => void;
}

export function ColorFilter({
  selectedColor,
  onColorSelect,
}: ColorFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {colorOptions.map((color) => (
        <Button
          key={color}
          onClick={() => onColorSelect(color === selectedColor ? null : color)}
          variant={color === selectedColor ? "default" : "outline"}
        >
          {color}
        </Button>
      ))}
    </div>
  );
}
