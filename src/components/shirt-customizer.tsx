"use client";

import type React from "react";

import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  ContactShadows,
  PresentationControls,
  OrbitControls,
} from "@react-three/drei";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
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
import { motion, AnimatePresence } from "motion/react";
import ColorPicker from "./color-picker";
import Shirt from "./shirt";
import Loader from "./loader";
import SceneCamera from "./scene-camera";
import Link from "next/link";
import { useMediaQuery } from "~/hooks/use-mobile-customizer";
import { cn } from "~/lib/utils";

export default function ShirtCustomizer() {
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [accentColor1, setAccentColor1] = useState("#4a90e2");
  const [accentColor2, setAccentColor2] = useState("#e74c3c");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPosition, setLogoPosition] = useState("chest");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [textContent, setTextContent] = useState("3");
  const [textContent2, setTextContent2] = useState("ABCDEFGH");
  const [textColor, setTextColor] = useState("#000000");
  const [textStyle, setTextStyle] = useState("curved");
  const [hasOutline, setHasOutline] = useState(false);
  const [outlineColor, setOutlineColor] = useState("#ffffff");
  const [isLoading, setIsLoading] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [currentView, setCurrentView] = useState("front");
  const [animateShirt, setAnimateShirt] = useState(false);
  const [lastColorChange, setLastColorChange] = useState(Date.now());
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Mobile navigation tabs
  const mobileTabs = [
    { id: "colors", label: "Colors", icon: <Palette className="h-5 w-5" /> },
    { id: "logos", label: "Logos", icon: <ImageIcon className="h-5 w-5" /> },
    { id: "number", label: "Number", icon: <Type className="h-5 w-5" /> },
    { id: "info", label: "Info", icon: <ShirtIcon className="h-5 w-5" /> },
  ];

  // Track color changes to trigger animations
  useEffect(() => {
    setLastColorChange(Date.now());
    setAnimateShirt(true);
    const timer = setTimeout(() => setAnimateShirt(false), 800);
    return () => clearTimeout(timer);
  }, [shirtColor, accentColor1, accentColor2]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoPreview(e.target.result as string);
          // Trigger animation when logo changes
          setAnimateShirt(true);
          setTimeout(() => setAnimateShirt(false), 800);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    // In a real app, this would capture the canvas and download the image
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      if (canvasRef.current) {
        // This is a simplified version - in a real app you would use proper canvas capture
        const link = document.createElement("a");
        link.download = "shirt-design.png";
        link.href = canvasRef.current.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveDesign = () => {
    // In a real app, this would save the design to a database
    setIsLoading(true);

    // Create a design object with all customization parameters
    const designData = {
      shirtColor,
      accentColor1,
      accentColor2,
      logoPosition,
      textContent,
      textContent2,
      textColor,
      textStyle,
      hasOutline,
      outlineColor,
      timestamp: new Date().toISOString(),
    };

    // Simulate saving to database
    setTimeout(() => {
      console.log("Design saved:", designData);
      localStorage.setItem("savedDesign", JSON.stringify(designData));
      setIsLoading(false);
      alert(
        "Design saved successfully! In a real app, this would be saved to a database."
      );
    }, 1000);
  };

  const handleViewChange = (view: string) => {
    if (view === currentView) return;

    setIsRotating(false);
    setCurrentView(view);

    // Trigger animation when view changes
    setAnimateShirt(true);
    setTimeout(() => setAnimateShirt(false), 800);
  };

  // Handle color changes with animation triggers
  const handleColorChange = (
    setter: (color: string) => void,
    color: string
  ) => {
    setter(color);
    setLastColorChange(Date.now());
  };

  // Toggle sheet visibility
  const toggleSheet = (sheetId: string) => {
    if (activeSheet === sheetId) {
      setActiveSheet(null);
    } else {
      setActiveSheet(sheetId);
    }
  };

  // Render mobile view
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
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
                          onChange={(color) =>
                            handleColorChange(setShirtColor, color)
                          }
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
                          onChange={(color) =>
                            handleColorChange(setAccentColor1, color)
                          }
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
                          onChange={(color) =>
                            handleColorChange(setAccentColor2, color)
                          }
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
                      <div
                        key={style}
                        className={`border rounded-md p-2 text-center cursor-pointer ${
                          textStyle === style ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => {
                          setTextStyle(style);
                          setAnimateShirt(true);
                          setTimeout(() => setAnimateShirt(false), 800);
                        }}
                      >
                        <div className="aspect-square flex items-center justify-center">
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="mobile-number">Number</Label>
                  <Input
                    id="mobile-number"
                    value={textContent}
                    onChange={(e) => {
                      setTextContent(e.target.value);
                      setAnimateShirt(true);
                      setTimeout(() => setAnimateShirt(false), 800);
                    }}
                    maxLength={2}
                    placeholder="Enter number"
                  />
                  <p className="text-xs text-muted-foreground">
                    Max 2 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-text">Team Name</Label>
                  <Input
                    id="mobile-text"
                    value={textContent2}
                    onChange={(e) => {
                      setTextContent2(e.target.value);
                      setAnimateShirt(true);
                      setTimeout(() => setAnimateShirt(false), 800);
                    }}
                    maxLength={12}
                    placeholder="Enter text"
                  />
                  <p className="text-xs text-muted-foreground">
                    Max 12 characters
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="mobile-textColor">Text Color</Label>
                  <ColorPicker
                    color={textColor}
                    onChange={(color) => handleColorChange(setTextColor, color)}
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
                    id="mobile-outline"
                    checked={hasOutline}
                    onCheckedChange={(checked) => {
                      setHasOutline(checked);
                      setAnimateShirt(true);
                      setTimeout(() => setAnimateShirt(false), 800);
                    }}
                  />
                  <Label htmlFor="mobile-outline">Text Outline</Label>
                </div>

                {hasOutline && (
                  <div className="space-y-2">
                    <Label htmlFor="mobile-outlineColor">Outline Color</Label>
                    <ColorPicker
                      color={outlineColor}
                      onChange={(color) =>
                        handleColorChange(setOutlineColor, color)
                      }
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
                    id="mobile-logoPosition"
                    value={logoPosition}
                    onValueChange={(value) => {
                      setLogoPosition(value);
                      setAnimateShirt(true);
                      setTimeout(() => setAnimateShirt(false), 800);
                    }}
                    className="grid grid-cols-2 gap-2"
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
                      <SelectItem value="basketball">
                        Basketball Jersey
                      </SelectItem>
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
                      <RadioGroupItem
                        value="sublimation"
                        id="mobile-sublimation"
                      />
                      <Label htmlFor="mobile-sublimation">Sublimation</Label>
                      <span className="ml-auto text-xs text-green-600 font-medium">
                        FREE
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="embroidery"
                        id="mobile-embroidery"
                      />
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
                    id="mobile-autoRotate"
                    checked={isRotating}
                    onCheckedChange={setIsRotating}
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
                  currentView === view
                    ? "bg-primary text-primary-foreground"
                    : ""
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
              onClick={() => setIsRotating(!isRotating)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Desktop/tablet view
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left Panel - Customization Options */}
      <div className="w-full lg:w-1/4 p-4 overflow-y-auto border-r">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customizer</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveDesign}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <Tabs defaultValue="colors">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="logos">Logos</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Base Color</h3>
              <ColorPicker
                color={shirtColor}
                onChange={(color) => handleColorChange(setShirtColor, color)}
                presetColors={[
                  "#ffffff",
                  "#000000",
                  "#ff0000",
                  "#0000ff",
                  "#ffff00",
                  "#00ff00",
                ]}
              />

              <Separator className="my-4" />

              <h3 className="font-medium">Accent Color #1 (Collar)</h3>
              <ColorPicker
                color={accentColor1}
                onChange={(color) => handleColorChange(setAccentColor1, color)}
                presetColors={["#4a90e2", "#50e3c2"]}
              />

              <Separator className="my-4" />

              <h3 className="font-medium">Accent Color #2 (Sleeves)</h3>
              <ColorPicker
                color={accentColor2}
                onChange={(color) => handleColorChange(setAccentColor2, color)}
                presetColors={[
                  "#e74c3c",
                  "#f5a623",
                  "#d0021b",
                  "#bd10e0",
                  "#9013fe",
                ]}
              />
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-4">
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
                        setTextStyle(style);
                        setAnimateShirt(true);
                        setTimeout(() => setAnimateShirt(false), 800);
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

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  value={textContent}
                  onChange={(e) => {
                    setTextContent(e.target.value);
                    setAnimateShirt(true);
                    setTimeout(() => setAnimateShirt(false), 800);
                  }}
                  maxLength={2}
                  placeholder="Enter number"
                />
                <p className="text-xs text-muted-foreground">
                  Max 2 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Team Name</Label>
                <Input
                  id="text"
                  value={textContent2}
                  onChange={(e) => {
                    setTextContent2(e.target.value);
                    setAnimateShirt(true);
                    setTimeout(() => setAnimateShirt(false), 800);
                  }}
                  maxLength={12}
                  placeholder="Enter text"
                />
                <p className="text-xs text-muted-foreground">
                  Max 12 characters
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <ColorPicker
                  color={textColor}
                  onChange={(color) => handleColorChange(setTextColor, color)}
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
                    setHasOutline(checked);
                    setAnimateShirt(true);
                    setTimeout(() => setAnimateShirt(false), 800);
                  }}
                />
                <Label htmlFor="outline">Text Outline</Label>
              </div>

              {hasOutline && (
                <div className="space-y-2">
                  <Label htmlFor="outlineColor">Outline Color</Label>
                  <ColorPicker
                    color={outlineColor}
                    onChange={(color) =>
                      handleColorChange(setOutlineColor, color)
                    }
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
          </TabsContent>

          <TabsContent value="logos" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Upload Logo</h3>
              <motion.div
                className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.01, borderColor: "#000" }}
                whileTap={{ scale: 0.99 }}
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
              </motion.div>

              {logoPreview && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-sm font-medium mb-2">Preview:</h4>
                  <div className="border rounded-md p-2 bg-white">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo preview"
                      className="max-h-24 mx-auto"
                    />
                  </div>
                </motion.div>
              )}

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="logoPosition">Logo Position</Label>
                <RadioGroup
                  id="logoPosition"
                  value={logoPosition}
                  onValueChange={(value) => {
                    setLogoPosition(value);
                    setAnimateShirt(true);
                    setTimeout(() => setAnimateShirt(false), 800);
                  }}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="chest" id="chest" />
                    <Label htmlFor="chest">Chest</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="back" id="back" />
                    <Label htmlFor="back">Back (below neck)</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="sleeve" id="sleeve" />
                    <Label htmlFor="sleeve">Sleeve</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <RadioGroupItem value="sponsor" id="sponsor" />
                    <Label htmlFor="sponsor">Sponsor</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shirtStyle">Shirt Style</Label>
                <Select defaultValue="basketball">
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basketball">
                      Basketball Jersey
                    </SelectItem>
                    <SelectItem value="football">Football Jersey</SelectItem>
                    <SelectItem value="soccer">Soccer Jersey</SelectItem>
                    <SelectItem value="tshirt">T-Shirt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="printMethod">Print Method</Label>
                <RadioGroup defaultValue="sublimation">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sublimation" id="sublimation" />
                    <Label htmlFor="sublimation">Sublimation</Label>
                    <span className="ml-auto text-xs text-green-600 font-medium">
                      FREE
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="embroidery" id="embroidery" />
                    <Label htmlFor="embroidery">Tackle-twill embroidery</Label>
                    <span className="ml-auto text-xs text-green-600 font-medium">
                      $12.97 FREE
                    </span>
                  </div>
                </RadioGroup>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoRotate"
                  checked={isRotating}
                  onCheckedChange={setIsRotating}
                />
                <Label htmlFor="autoRotate">Auto-Rotate Model</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - 3D Preview */}
      <div className="w-full lg:w-3/4 h-[500px] lg:h-full relative">
        {isLoading && <Loader />}
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 2.5], fov: 25 }}
          className="w-full h-full bg-[#f8f9fa]"
          shadows
        >
          <color attach="background" args={["#f8f9fa"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
          <directionalLight position={[-1, -1, -1]} intensity={0.5} />

          <Suspense fallback={null}>
            {/* Use SceneCamera component for smooth camera transitions */}
            <SceneCamera currentView={currentView} isRotating={isRotating} />

            <PresentationControls
              global
              rotation={[0, isRotating ? Math.PI / 2 : 0, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
              snap={true}
            >
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
            </PresentationControls>
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4">
          <Button variant={"secondary"}>
            <Link href="/dashboard/gallery">View Gallery</Link>
          </Button>
          <Button>
            <Link href="/dashboard/designs">Saved Designs</Link>
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <AnimatePresence>
            {["front", "back", "left", "right"].map((view) => (
              <motion.button
                key={view}
                className={`bg-white border rounded-md px-3 py-1 text-sm shadow-sm hover:bg-muted/50 transition-colors ${
                  currentView === view
                    ? "bg-primary text-primary-foreground"
                    : ""
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
              onClick={() => setIsRotating(!isRotating)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
