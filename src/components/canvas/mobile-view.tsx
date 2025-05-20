import { useState, useRef, Suspense, useEffect } from "react";
import {
  handleColorChange,
  handleLogoUpload,
  handleSaveDesign,
  handleViewChange,
  toggleSheet,
  useShirtStore,
} from "~/lib/stores/useShirtStore";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  ContactShadows,
  PresentationControls,
  OrbitControls,
} from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import ColorPicker from "../color-picker";
import Shirt from "./shirt";
import {
  Download,
  Expand,
  ImageIcon,
  Palette,
  Plus,
  RotateCcw,
  Save,
  ShirtIcon,
  Type,
  Upload,
  X,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { useColorAnimation } from "~/hooks/use-color-animation";

// Mobile navigation tabs
const mobileTabs = [
  { id: "colors", label: "Colors", icon: <Palette className="h-5 w-5" /> },
  { id: "logos", label: "Logos", icon: <ImageIcon className="h-5 w-5" /> },
  { id: "number", label: "Number", icon: <Type className="h-5 w-5" /> },
  { id: "info", label: "Info", icon: <ShirtIcon className="h-5 w-5" /> },
];

export default function MobileView() {
  useColorAnimation();
  const {
    shirtColor,
    accentColor1,
    accentColor2,
    logoFile,
    logoPosition,
    logoPreview,
    textContent,
    textContent2,
    textColor,
    textStyle,
    hasOutline,
    outlineColor,
    isLoading,
    isRotating,
    currentView,
    animateShirt,
    lastColorChange,
    showBackdrop,
    activeSheet,
    setField,
  } = useShirtStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  <main className="flex flex-col h-screen bg-gray-100">
    {/* Top controls */}
    <div className="flex justify-between items-center p-3 bg-white border-b">
      {/* <div className="flex items-center space-x-2">
        <Label htmlFor="backdrop" className="text-sm">
          Backdrop
        </Label>
        <Switch
          id="backdrop"
          checked={showBackdrop}
          onCheckedChange={setShowBackdrop}
        />
      </div> */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md bg-white"
        >
          <Expand className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Main content area with 3D preview */}
    <div className="flex-1 relative">
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        className="w-full h-full"
      >
        <color
          attach="background"
          args={[showBackdrop ? "#f0f0f0" : "transparent"]}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Suspense fallback={null}>
          <Center>
            <Shirt
              color={shirtColor}
              accentColor1={accentColor1}
              accentColor2={accentColor2}
              logoUrl={logoPreview}
              logoPosition={logoPosition}
              textContent={textContent}
              textContent2={textContent2}
              textColor={textColor}
              textStyle={textStyle}
              hasOutline={hasOutline}
              outlineColor={outlineColor}
              isRotating={isRotating}
              animate={animateShirt}
              lastColorChange={lastColorChange}
            />
          </Center>
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.5}
            scale={10}
            blur={1.5}
            far={1}
          />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={isRotating}
            autoRotateSpeed={1}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>

    {/* Bottom navigation */}
    <div className="bg-white border-t">
      <div className="flex justify-around">
        {mobileTabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-1 flex-col items-center justify-center py-3",
              activeSheet === tab.id ? "text-primary" : "text-gray-500"
            )}
            onClick={() => toggleSheet(tab.id)}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Bottom action buttons */}
    <div className="bg-white p-3 border-t flex space-x-2">
      <Button variant="outline" className="flex-1">
        <Plus className="mr-2 h-4 w-4" />
        Load Design
      </Button>
      <Button
        variant="outline"
        className="flex-1 bg-primary text-primary-foreground"
        onClick={handleSaveDesign}
      >
        <Save className="mr-2 h-4 w-4" />
        Save Design
      </Button>
      <Button className="flex-1">Create Order</Button>
    </div>

    {/* Colors Sheet */}
    <Sheet
      open={activeSheet === "colors"}
      onOpenChange={(open) => !open && setActiveSheet(null)}
    >
      <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
        <SheetHeader className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Jersey Colors</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSheet(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="overflow-y-auto h-full pb-20">
          <Accordion type="single" collapsible defaultValue="jersey-colors">
            <AccordionItem className="pl-4" value="jersey-colors">
              <Button variant="secondary">
                <AccordionTrigger className="text-base font-medium">
                  Jersey Colors
                </AccordionTrigger>
              </Button>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Base color
                    </Label>
                    <ColorPicker
                      color={shirtColor}
                      onChange={(color) => setField("shirtColor", color)}
                      presetColors={[
                        "#ffffff",
                        "#000000",
                        "#ff0000",
                        "#0000ff",
                        "#ffff00",
                        "#00ff00",
                      ]}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Accent Color #1
                    </Label>
                    <ColorPicker
                      color={accentColor1}
                      onChange={(color) => setField("accentColor1", color)}
                      presetColors={[
                        "#4a90e2",
                        "#50e3c2",
                        "#b8e986",
                        "#7ed321",
                        "#9013fe",
                      ]}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Accent Color #2
                    </Label>
                    <ColorPicker
                      color={accentColor2}
                      onChange={(color) => setField("accentColor2", color)}
                      presetColors={[
                        "#e74c3c",
                        "#f5a623",
                        "#d0021b",
                        "#bd10e0",
                        "#9013fe",
                      ]}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="pl-4" value="shorts-colors">
              <Button variant="secondary">
                <AccordionTrigger className="text-base font-medium">
                  Shorts Colors
                </AccordionTrigger>
              </Button>
              <AccordionContent>
                <div className="space-y-4 py-2">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Base color
                    </Label>
                    <Select defaultValue="white">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Accent Color
                    </Label>
                    <Select defaultValue="blue">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="blue">Columbia</SelectItem>
                        <SelectItem value="red">Devil Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>

    {/* Number Sheet */}
    <Sheet
      open={activeSheet === "number"}
      onOpenChange={(open) => !open && setActiveSheet(null)}
    >
      <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
        <SheetHeader className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Number & Text</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSheet(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="overflow-y-auto h-full pb-20">
          <div className="space-y-6 p-4">
            <div>
              <h3 className="font-medium mb-2">Text Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {["straight", "curved", "arched"].map((style) => (
                  <motion.div
                    key={style}
                    className={`border rounded-md p-2 text-center cursor-pointer ${
                      textStyle === style ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => {
                      setField("textStyle", style);
                      setField("animateShirt", true);
                      setTimeout(() => setField("animateShirt", false), 800);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="aspect-square flex items-center justify-center">
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                value={textContent}
                onChange={(e) => {
                  setField("textContent", e.target.value);
                  setField("animateShirt", true);
                  setTimeout(() => setField("animateShirt", false), 800);
                }}
                maxLength={2}
                placeholder="Enter number"
              />
              <p className="text-xs text-muted-foreground">Max 2 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Team Name</Label>
              <Input
                id="text"
                value={textContent2}
                onChange={(e) => {
                  setField("textContent2", e.target.value);
                  setField("animateShirt", true);
                  setTimeout(() => setField("animateShirt", false), 800);
                }}
                maxLength={12}
                placeholder="Enter text"
              />
              <p className="text-xs text-muted-foreground">Max 12 characters</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="mobile-textColor">Text Color</Label>
              <ColorPicker
                color={textColor}
                onChange={(color) => setField("textColor", color)}
                presetColors={[
                  "#000000",
                  "#ffffff",
                  "#ff0000",
                  "#0000ff",
                  "#ffff00",
                ]}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="outline"
                checked={hasOutline}
                onCheckedChange={(checked) => {
                  setField("hasOutline", checked);
                  setField("animateShirt", true);
                  setTimeout(() => setField("animateShirt", false), 800);
                }}
              />
              <Label htmlFor="mobile-outline">Text Outline</Label>
            </div>

            {hasOutline && (
              <div className="space-y-2">
                <Label htmlFor="mobile-outlineColor">Outline Color</Label>
                <ColorPicker
                  color={outlineColor}
                  onChange={(color) => setField("outlineColor", color)}
                  presetColors={[
                    "#ffffff",
                    "#000000",
                    "#ff0000",
                    "#0000ff",
                    "#ffff00",
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>

    {/* Logos Sheet */}
    <Sheet
      open={activeSheet === "logos"}
      onOpenChange={(open) => !open && setActiveSheet(null)}
    >
      <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
        <SheetHeader className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Logo Options</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSheet(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="overflow-y-auto h-full pb-20">
          <div className="space-y-6 p-4">
            <div>
              <h3 className="font-medium mb-2">Upload Logo</h3>
              <div
                className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drop your logo here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Acceptable formats include: .png, .jpg, .ai, .eps, .svg
                </p>
              </div>
            </div>

            {logoPreview && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Preview:</h4>
                <div className="border rounded-md p-2 bg-white">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="max-h-24 mx-auto"
                  />
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="mobile-logoPosition">Logo Position</Label>
              <RadioGroup
                id="logoPosition"
                value={logoPosition}
                onValueChange={(value) => {
                  setField("logoPosition", value);
                  setField("animateShirt", true);
                  setTimeout(() => setField("animateShirt", false), 800);
                }}
              >
                <div className="flex items-center space-x-2 border rounded-md p-2">
                  <RadioGroupItem value="chest" id="mobile-chest" />
                  <Label htmlFor="mobile-chest">Chest</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-2">
                  <RadioGroupItem value="back" id="mobile-back" />
                  <Label htmlFor="mobile-back">Back</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-2">
                  <RadioGroupItem value="sleeve" id="mobile-sleeve" />
                  <Label htmlFor="mobile-sleeve">Sleeve</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-2">
                  <RadioGroupItem value="sponsor" id="mobile-sponsor" />
                  <Label htmlFor="mobile-sponsor">Sponsor</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    {/* Info Sheet */}
    <Sheet
      open={activeSheet === "info"}
      onOpenChange={(open) => !open && setActiveSheet(null)}
    >
      <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
        <SheetHeader className="border-b pb-2 mb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Style Options</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSheet(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <div className="overflow-y-auto h-full pb-20">
          <div className="space-y-6 p-4">
            <div className="space-y-2">
              <Label htmlFor="mobile-shirtStyle">Shirt Style</Label>
              <Select defaultValue="basketball">
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basketball">Basketball Jersey</SelectItem>
                  <SelectItem value="football">Football Jersey</SelectItem>
                  <SelectItem value="soccer">Soccer Jersey</SelectItem>
                  <SelectItem value="tshirt">T-Shirt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="mobile-printMethod">Print Method</Label>
              <RadioGroup defaultValue="sublimation">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sublimation" id="mobile-sublimation" />
                  <Label htmlFor="mobile-sublimation">Sublimation</Label>
                  <span className="ml-auto text-xs text-green-600 font-medium">
                    FREE
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="embroidery" id="mobile-embroidery" />
                  <Label htmlFor="mobile-embroidery">
                    Tackle-twill embroidery
                  </Label>
                  <span className="ml-auto text-xs text-green-600 font-medium">
                    $12.97 FREE
                  </span>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Switch
                id="autoRotate"
                checked={isRotating}
                onCheckedChange={(checked) => {
                  setField("isRotating", checked);
                  setField("animateShirt", true);
                  setTimeout(() => setField("animateShirt", false), 800);
                }}
              />
              <Label htmlFor="mobile-autoRotate">Auto-Rotate Model</Label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    {/* View controls */}
    <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
      <AnimatePresence>
        {["front", "back", "left", "right"].map((view) => (
          <motion.button
            key={view}
            className={`bg-white border rounded-md px-3 py-1 text-sm shadow-sm hover:bg-muted/50 transition-colors ${
              currentView === view ? "bg-primary text-primary-foreground" : ""
            }`}
            onClick={() => handleViewChange(view)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={currentView === view ? { scale: 0.95 } : { scale: 1 }}
            animate={currentView === view ? { scale: 1 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </motion.button>
        ))}
        <motion.button
          className="bg-white border rounded-md px-3 py-1 text-sm shadow-sm hover:bg-muted/50 transition-colors"
          onClick={() => setField("isRotating", !isRotating)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="h-4 w-4" />
        </motion.button>
      </AnimatePresence>
    </div>
  </main>;
}
