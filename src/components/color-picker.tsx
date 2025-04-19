"use client";

import type React from "react";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

export default function ColorPicker({
  color,
  onChange,
  presetColors = [],
}: ColorPickerProps) {
  const [tempColor, setTempColor] = useState(color);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempColor(e.target.value);
    onChange(e.target.value);
  };

  const handlePresetClick = (presetColor: string) => {
    setTempColor(presetColor);
    onChange(presetColor);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-10 h-10 rounded-md border shadow-sm"
            style={{ backgroundColor: color }}
            aria-label="Pick a color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div
                className="w-12 h-12 rounded-md border shadow-sm"
                style={{ backgroundColor: tempColor }}
              />
              <input
                type="color"
                value={tempColor}
                onChange={handleColorChange}
                className="h-12 w-32"
              />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    "w-8 h-8 rounded-md border shadow-sm",
                    tempColor === presetColor &&
                      "ring-2 ring-primary ring-offset-2"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handlePresetClick(presetColor)}
                  aria-label={`Select color ${presetColor}`}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex-1">
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
}
