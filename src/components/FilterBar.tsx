import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface FilterBarProps {
  onSpeciesChange?: (value: string) => void;
  onBreedChange?: (value: string) => void;
  onColorChange?: (value: string) => void;
  onDateChange?: (date: Date | undefined) => void;
  selectedDate?: Date;
}

const FilterBar = ({
  onSpeciesChange = () => {},
  onBreedChange = () => {},
  onColorChange = () => {},
  onDateChange = () => {},
  selectedDate,
}: FilterBarProps) => {
  const species = ["All", "Dog", "Cat", "Bird", "Other"];
  const breeds = [
    "All",
    "Golden Retriever",
    "Labrador",
    "Siamese",
    "Persian",
    "Parakeet",
  ];
  const colors = ["All", "Black", "White", "Brown", "Mixed"];

  return (
    <div className="w-full bg-white border-b p-4 flex flex-wrap gap-4 items-center justify-start">
      <Select onValueChange={onSpeciesChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select species" />
        </SelectTrigger>
        <SelectContent>
          {species.map((s) => (
            <SelectItem key={s} value={s.toLowerCase()}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onBreedChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select breed" />
        </SelectTrigger>
        <SelectContent>
          {breeds.map((b) => (
            <SelectItem key={b} value={b.toLowerCase()}>
              {b}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onColorChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select color" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((c) => (
            <SelectItem key={c} value={c.toLowerCase()}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        onClick={() => {
          onSpeciesChange("all");
          onBreedChange("all");
          onColorChange("all");
          onDateChange(undefined);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterBar;
