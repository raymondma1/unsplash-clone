import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  value: "relevant" | "latest";
  onChange: (value: "relevant" | "latest") => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevant">Relevant</SelectItem>
        <SelectItem value="latest">Latest</SelectItem>
      </SelectContent>
    </Select>
  );
}
