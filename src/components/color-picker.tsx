"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { EyeIcon as EyeDropper, Check, Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  title?: string;
}

export default function ColorPicker({
  color,
  onChange,
  presetColors = [],
  title,
}: ColorPickerProps) {
  const [tempColor, setTempColor] = useState(color);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [alpha, setAlpha] = useState(100);
  const [activeTab, setActiveTab] = useState("picker");

  // Parse color to HSL when color changes
  useEffect(() => {
    setTempColor(color);
    const parsedColor = parseColor(color);
    if (parsedColor) {
      setHue(parsedColor.h);
      setSaturation(parsedColor.s);
      setLightness(parsedColor.l);
      setAlpha(parsedColor.a * 100);
    }
  }, [color]);

  // Update color when HSL values change
  useEffect(() => {
    const newColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${
      alpha / 100
    })`;
    setTempColor(newColor);
  }, [hue, saturation, lightness, alpha]);

  // Helper function to parse color string to HSL
  const parseColor = (colorStr: string) => {
    try {
      // Create a temporary element to use the browser's color parsing
      const tempElem = document.createElement("div");
      tempElem.style.color = colorStr;
      document.body.appendChild(tempElem);
      const computedColor = getComputedStyle(tempElem).color;
      document.body.removeChild(tempElem);

      // Parse the computed color
      const match = computedColor.match(
        /rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?$$/
      );
      if (!match || match.length < 4) return null;

      const r = Number.parseInt(match[1]!) / 255;
      const g = Number.parseInt(match[2]!) / 255;
      const b = Number.parseInt(match[3]!) / 255;
      const a = match[4] ? Number.parseFloat(match[4]) : 1;

      // Convert RGB to HSL
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }

        h *= 60;
      }

      return { h, s: s * 100, l: l * 100, a };
    } catch (error) {
      console.error("Error parsing color:", error);
      return { h: 0, s: 100, l: 50, a: 1 };
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTempColor(newColor);
    onChange(newColor);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTempColor(newColor);
    onChange(newColor);
  };

  const handlePresetClick = (presetColor: string) => {
    setTempColor(presetColor);
    onChange(presetColor);
  };

  const handleHslChange = () => {
    const newColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${
      alpha / 100
    })`;
    onChange(newColor);
  };

  const colorCategories = [
    {
      name: "Basic",
      colors: [
        "#ffffff",
        "#000000",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ],
    },
    {
      name: "Team",
      colors: [
        "#1e40af",
        "#b91c1c",
        "#15803d",
        "#7e22ce",
        "#0e7490",
        "#b45309",
        "#4d7c0f",
      ],
    },
    {
      name: "Pastel",
      colors: [
        "#fecaca",
        "#fed7aa",
        "#fef08a",
        "#d9f99d",
        "#bfdbfe",
        "#ddd6fe",
        "#fbcfe8",
      ],
    },
  ];

  // Find the category that contains the current color
  const findColorCategory = () => {
    for (const category of colorCategories) {
      if (category.colors.includes(tempColor.toLowerCase())) {
        return category.name.toLowerCase();
      }
    }
    return "custom";
  };

  return (
    <div className="flex flex-col gap-2">
      {title && <Label className="text-sm font-medium">{title}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            className="flex items-center gap-2 p-2 border rounded-md shadow-sm hover:shadow-md transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-8 h-8 rounded-md overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: color }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee)] bg-[length:8px_8px] bg-[position:0_0,4px_4px] opacity-20" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {title || "Select Color"}
              </span>
              <span className="text-xs text-muted-foreground">{color}</span>
            </div>
            <Palette className="ml-auto h-4 w-4 text-muted-foreground" />
          </motion.button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Tabs
            defaultValue="picker"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="p-4 pb-0">
              <TabsList className="grid grid-cols-4 mb-2">
                <TabsTrigger value="picker">Picker</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
                <TabsTrigger value="hex">Hex</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="picker" className="p-4 pt-2">
              <div className="space-y-4">
                {/* Color preview */}
                <div className="relative h-32 rounded-md overflow-hidden">
                  <div
                    className="absolute inset-0 transition-colors"
                    style={{ backgroundColor: tempColor }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee)] bg-[length:8px_8px] bg-[position:0_0,4px_4px] opacity-20" />
                </div>

                {/* Hue slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hue" className="text-xs">
                      Hue
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(hue)}°
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#ff0000] via-[#ffff00] via-[#00ff00] via-[#00ffff] via-[#0000ff] via-[#ff00ff] to-[#ff0000] pointer-events-none" />
                    <Slider
                      id="hue"
                      min={0}
                      max={360}
                      step={1}
                      value={[hue]}
                      onValueChange={(value) => setHue(value[0] ?? 0)}
                      onValueCommit={handleHslChange}
                      className="h-5 z-10"
                    />
                  </div>
                </div>

                {/* Saturation slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="saturation" className="text-xs">
                      Saturation
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(saturation)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, hsla(${hue}, 0%, ${lightness}%, ${
                          alpha / 100
                        }), hsla(${hue}, 100%, ${lightness}%, ${alpha / 100}))`,
                      }}
                    />
                    <Slider
                      id="saturation"
                      min={0}
                      max={100}
                      step={1}
                      value={[saturation]}
                      onValueChange={(value) => setSaturation(value[0] ?? 0)}
                      onValueCommit={handleHslChange}
                      className="h-5 z-10"
                    />
                  </div>
                </div>

                {/* Lightness slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lightness" className="text-xs">
                      Lightness
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(lightness)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, hsla(${hue}, ${saturation}%, 0%, ${
                          alpha / 100
                        }), hsla(${hue}, ${saturation}%, 50%, ${
                          alpha / 100
                        }), hsla(${hue}, ${saturation}%, 100%, ${
                          alpha / 100
                        }))`,
                      }}
                    />
                    <Slider
                      id="lightness"
                      min={0}
                      max={100}
                      step={1}
                      value={[lightness]}
                      onValueChange={(value) => setLightness(value[0] ?? 0)}
                      onValueCommit={handleHslChange}
                      className="h-5 z-10"
                    />
                  </div>
                </div>

                {/* Alpha slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="alpha" className="text-xs">
                      Opacity
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(alpha)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee)] bg-[length:8px_8px] bg-[position:0_0,4px_4px] rounded-md pointer-events-none" />
                    <div
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, hsla(${hue}, ${saturation}%, ${lightness}%, 0), hsla(${hue}, ${saturation}%, ${lightness}%, 1))`,
                      }}
                    />
                    <Slider
                      id="alpha"
                      min={0}
                      max={100}
                      step={1}
                      value={[alpha]}
                      onValueChange={(value) => setAlpha(value[0] ?? 0)}
                      onValueCommit={handleHslChange}
                      className="h-5 z-10"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="presets" className="p-4 pt-2">
              <div className="space-y-4">
                {colorCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <h3 className="text-sm font-medium">{category.name}</h3>
                    <div className="grid grid-cols-8 gap-2">
                      {category.colors.map((presetColor) => (
                        <motion.button
                          key={presetColor}
                          className={cn(
                            "relative w-6 h-6 rounded-md border shadow-sm",
                            tempColor.toLowerCase() ===
                              presetColor.toLowerCase() &&
                              "ring-2 ring-primary ring-offset-2"
                          )}
                          style={{ backgroundColor: presetColor }}
                          onClick={() => handlePresetClick(presetColor)}
                          aria-label={`Select color ${presetColor}`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tempColor.toLowerCase() ===
                            presetColor.toLowerCase() && (
                            <Check className="absolute inset-0 m-auto h-4 w-4 text-white mix-blend-difference" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}

                {presetColors.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Custom Presets</h3>
                    <div className="grid grid-cols-8 gap-2">
                      {presetColors.map((presetColor) => (
                        <motion.button
                          key={presetColor}
                          className={cn(
                            "relative w-6 h-6 rounded-md border shadow-sm",
                            tempColor.toLowerCase() ===
                              presetColor.toLowerCase() &&
                              "ring-2 ring-primary ring-offset-2"
                          )}
                          style={{ backgroundColor: presetColor }}
                          onClick={() => handlePresetClick(presetColor)}
                          aria-label={`Select color ${presetColor}`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tempColor.toLowerCase() ===
                            presetColor.toLowerCase() && (
                            <Check className="absolute inset-0 m-auto h-4 w-4 text-white mix-blend-difference" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="p-4 pt-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: tempColor }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee)] bg-[length:8px_8px] bg-[position:0_0,4px_4px] opacity-20" />
                  </div>
                  <input
                    type="color"
                    value={tempColor}
                    onChange={handleColorChange}
                    className="h-16 w-32"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-xs border rounded-md hover:bg-muted/50"
                    onClick={() => {
                      // In a real app, this would use the EyeDropper API
                      alert(
                        "Eyedropper would be implemented here in a real app"
                      );
                    }}
                  >
                    <EyeDropper className="h-3 w-3" />
                    <span>Pick color</span>
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hex" className="p-4 pt-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: tempColor }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%,#eee)] bg-[length:8px_8px] bg-[position:0_0,4px_4px] opacity-20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hex-input" className="text-xs">
                      Hex Value
                    </Label>
                    <input
                      id="hex-input"
                      type="text"
                      value={tempColor}
                      onChange={handleHexInputChange}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-xs text-muted-foreground">
              {activeTab === "picker"
                ? "HSL Color Picker"
                : activeTab === "presets"
                ? "Color Presets"
                : activeTab === "custom"
                ? "Custom Color"
                : "Hex Color"}
            </div>
            <motion.button
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md"
              onClick={() => onChange(tempColor)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply
            </motion.button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
