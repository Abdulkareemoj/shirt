import {
  // handleDownload,
  handleLogoUpload,
  handleSaveDesign,
  handleViewChange,
  useShirtStore,
} from "~/lib/stores/useShirtStore";
import { Suspense, useRef } from "react";
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
import Loader from "../landing/loader";
import SceneCamera from "./scene-camera";
import Link from "next/link";
import { Download, RotateCcw, Save, Upload } from "lucide-react";
import { useColorAnimation } from "~/hooks/use-color-animation";
import FontLoaderComponent from "./font-loader";

export default function DesktopView() {
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
  return (
    <main className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left Panel - Customization Options */}
      <div className="w-full lg:w-1/4 p-4 overflow-y-auto border-r">
        <div className="flex justify-between items-center mb-6 lg:flex-col">
          <h1 className="text-2xl font-bold">Customizer</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveDesign}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              size="sm"
              // onClick={handleDownload}
            >
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

              <Separator className="my-4" />

              <h3 className="font-medium">Accent Color #1 (Collar)</h3>
              <ColorPicker
                color={accentColor1}
                onChange={(color) => setField("accentColor1", color)}
                presetColors={["#4a90e2", "#50e3c2"]}
              />

              <Separator className="my-4" />

              <h3 className="font-medium">Accent Color #2 (Sleeves)</h3>
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

              <Separator className="my-4" />

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
                    setField("textContent2", e.target.value);
                    setField("animateShirt", true);
                    setTimeout(() => setField("animateShirt", false), 800);
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
                <Label htmlFor="outline">Text Outline</Label>
              </div>

              {hasOutline && (
                <div className="space-y-2">
                  <Label htmlFor="outlineColor">Outline Color</Label>
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
                    setField("logoPosition", value);
                    setField("animateShirt", true);
                    setTimeout(() => setField("animateShirt", false), 800);
                  }}
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
                  onCheckedChange={(checked) => {
                    setField("isRotating", checked);
                    setField("animateShirt", true);
                    setTimeout(() => setField("animateShirt", false), 800);
                  }}
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
          <FontLoaderComponent fontUrl="/fonts/helvetiker_regular.typeface.json" />

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
              onClick={() => setField("isRotating", !isRotating)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-4 w-4" />
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
