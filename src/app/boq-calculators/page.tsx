'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator } from "lucide-react";

// Basic form state types (could be expanded)
interface ConcreteInputs { length: string; width: string; thickness: string; grade: string; }
interface FlooringInputs { area: string; tileLength: string; tileWidth: string; wastage: string; }
interface BrickworkInputs { wallLength: string; wallHeight: string; brickLength: string; brickHeight: string; brickWidth: string; mortarThickness: string; }

export default function BoQCalculatorsPage() {
  const [concreteInputs, setConcreteInputs] = useState<ConcreteInputs>({ length: '', width: '', thickness: '', grade: 'M20' });
  const [concreteResult, setConcreteResult] = useState<string | null>(null);

  const [flooringInputs, setFlooringInputs] = useState<FlooringInputs>({ area: '', tileLength: '', tileWidth: '', wastage: '10' });
  const [flooringResult, setFlooringResult] = useState<string | null>(null);

  const [brickworkInputs, setBrickworkInputs] = useState<BrickworkInputs>({ wallLength: '', wallHeight: '', brickLength: '0.23', brickHeight: '0.075', brickWidth: '0.115', mortarThickness: '0.01' });
  const [brickworkResult, setBrickworkResult] = useState<string | null>(null);

  const handleConcreteCalculate = () => {
    const l = parseFloat(concreteInputs.length);
    const w = parseFloat(concreteInputs.width);
    const t = parseFloat(concreteInputs.thickness);
    if (isNaN(l) || isNaN(w) || isNaN(t) || l <= 0 || w <= 0 || t <= 0) {
      setConcreteResult("Invalid inputs. Please enter positive numbers for dimensions.");
      return;
    }
    const volume = l * w * t;
    // Simplified estimation - in reality, this depends heavily on the grade for cement, sand, aggregate ratios
    setConcreteResult(`Estimated Concrete Volume: ${volume.toFixed(2)} cubic meters. For ${concreteInputs.grade}, detailed mix design is needed for material breakdown.`);
  };
  
  const handleFlooringCalculate = () => {
    const area = parseFloat(flooringInputs.area);
    const tileL = parseFloat(flooringInputs.tileLength);
    const tileW = parseFloat(flooringInputs.tileWidth);
    const wastagePercent = parseFloat(flooringInputs.wastage) / 100;

    if (isNaN(area) || isNaN(tileL) || isNaN(tileW) || isNaN(wastagePercent) || area <= 0 || tileL <= 0 || tileW <= 0 || wastagePercent < 0) {
        setFlooringResult("Invalid inputs. Please enter positive numbers for area, tile dimensions and valid wastage.");
        return;
    }
    const tileArea = tileL * tileW;
    if (tileArea === 0) {
        setFlooringResult("Tile dimensions cannot be zero.");
        return;
    }
    const numTiles = Math.ceil(area / tileArea);
    const totalTiles = Math.ceil(numTiles * (1 + wastagePercent));
    setFlooringResult(`Estimated Tiles Needed: ${totalTiles} tiles (including ${flooringInputs.wastage}% wastage).`);
  };

  const handleBrickworkCalculate = () => {
    const wl = parseFloat(brickworkInputs.wallLength);
    const wh = parseFloat(brickworkInputs.wallHeight);
    const bl = parseFloat(brickworkInputs.brickLength);
    const bh = parseFloat(brickworkInputs.brickHeight);
    const bw = parseFloat(brickworkInputs.brickWidth); // For volume of one brick
    const mt = parseFloat(brickworkInputs.mortarThickness);

    if (isNaN(wl) || isNaN(wh) || isNaN(bl) || isNaN(bh) || isNaN(bw) || isNaN(mt) || wl <= 0 || wh <= 0 || bl <= 0 || bh <= 0 || bw <=0 || mt < 0) {
        setBrickworkResult("Invalid inputs. Please enter positive numbers for dimensions and valid mortar thickness.");
        return;
    }
    // Volume of wall
    // Assuming standard brickwork calculation (e.g. half brick wall for this example, width could be an input)
    // For simplicity, let's calculate based on bricks per sq meter of wall face.
    const brickAreaWithMortar = (bl + mt) * (bh + mt);
    if(brickAreaWithMortar === 0) {
        setBrickworkResult("Brick dimensions plus mortar thickness cannot be zero.");
        return;
    }
    const wallArea = wl * wh;
    const numBricks = Math.ceil(wallArea / brickAreaWithMortar);
    setBrickworkResult(`Estimated Bricks Needed: ${numBricks} bricks for a wall of ${wallArea.toFixed(2)} sq. meters (face area). Mortar quantity needs separate calculation.`);
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">BOQ Material Calculators</h1>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {/* Concrete Calculator */}
        <AccordionItem value="concrete">
          <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline hover:text-primary">Concrete Calculator</AccordionTrigger>
          <AccordionContent>
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardDescription>Estimate concrete volume and materials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><Label htmlFor="concreteLength" className="text-foreground">Length (m)</Label><Input id="concreteLength" type="number" value={concreteInputs.length} onChange={e => setConcreteInputs({...concreteInputs, length: e.target.value})} placeholder="e.g., 10" className="bg-card border-input"/></div>
                  <div><Label htmlFor="concreteWidth" className="text-foreground">Width (m)</Label><Input id="concreteWidth" type="number" value={concreteInputs.width} onChange={e => setConcreteInputs({...concreteInputs, width: e.target.value})} placeholder="e.g., 5" className="bg-card border-input"/></div>
                  <div><Label htmlFor="concreteThickness" className="text-foreground">Thickness (m)</Label><Input id="concreteThickness" type="number" value={concreteInputs.thickness} onChange={e => setConcreteInputs({...concreteInputs, thickness: e.target.value})} placeholder="e.g., 0.15" className="bg-card border-input"/></div>
                  <div><Label htmlFor="concreteGrade" className="text-foreground">Concrete Grade</Label><Input id="concreteGrade" value={concreteInputs.grade} onChange={e => setConcreteInputs({...concreteInputs, grade: e.target.value})} placeholder="e.g., M20" className="bg-card border-input"/></div>
                </div>
                <Button onClick={handleConcreteCalculate} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Calculator className="mr-2 h-4 w-4"/> Calculate Concrete
                </Button>
                {concreteResult && <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm text-foreground">{concreteResult}</div>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Flooring Calculator */}
        <AccordionItem value="flooring">
          <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline hover:text-primary">Flooring (Tiles) Calculator</AccordionTrigger>
          <AccordionContent>
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardDescription>Estimate number of tiles needed for flooring.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><Label htmlFor="floorArea" className="text-foreground">Area (sq m)</Label><Input id="floorArea" type="number" value={flooringInputs.area} onChange={e => setFlooringInputs({...flooringInputs, area: e.target.value})} placeholder="e.g., 50" className="bg-card border-input"/></div>
                  <div><Label htmlFor="tileLength" className="text-foreground">Tile Length (m)</Label><Input id="tileLength" type="number" value={flooringInputs.tileLength} onChange={e => setFlooringInputs({...flooringInputs, tileLength: e.target.value})} placeholder="e.g., 0.6" className="bg-card border-input"/></div>
                  <div><Label htmlFor="tileWidth" className="text-foreground">Tile Width (m)</Label><Input id="tileWidth" type="number" value={flooringInputs.tileWidth} onChange={e => setFlooringInputs({...flooringInputs, tileWidth: e.target.value})} placeholder="e.g., 0.6" className="bg-card border-input"/></div>
                  <div><Label htmlFor="wastage" className="text-foreground">Wastage (%)</Label><Input id="wastage" type="number" value={flooringInputs.wastage} onChange={e => setFlooringInputs({...flooringInputs, wastage: e.target.value})} placeholder="e.g., 10" className="bg-card border-input"/></div>
                </div>
                <Button onClick={handleFlooringCalculate} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Calculator className="mr-2 h-4 w-4"/> Calculate Tiles
                </Button>
                {flooringResult && <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm text-foreground">{flooringResult}</div>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Brickwork Calculator */}
        <AccordionItem value="brickwork">
          <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline hover:text-primary">Brickwork Calculator</AccordionTrigger>
          <AccordionContent>
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardDescription>Estimate number of bricks for a wall.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div><Label htmlFor="wallLength" className="text-foreground">Wall Length (m)</Label><Input id="wallLength" type="number" value={brickworkInputs.wallLength} onChange={e => setBrickworkInputs({...brickworkInputs, wallLength: e.target.value})} placeholder="e.g., 10" className="bg-card border-input"/></div>
                  <div><Label htmlFor="wallHeight" className="text-foreground">Wall Height (m)</Label><Input id="wallHeight" type="number" value={brickworkInputs.wallHeight} onChange={e => setBrickworkInputs({...brickworkInputs, wallHeight: e.target.value})} placeholder="e.g., 3" className="bg-card border-input"/></div>
                  <div><Label htmlFor="brickLength" className="text-foreground">Brick Length (m)</Label><Input id="brickLength" type="number" value={brickworkInputs.brickLength} onChange={e => setBrickworkInputs({...brickworkInputs, brickLength: e.target.value})} placeholder="e.g., 0.23" className="bg-card border-input"/></div>
                  <div><Label htmlFor="brickHeight" className="text-foreground">Brick Height (m)</Label><Input id="brickHeight" type="number" value={brickworkInputs.brickHeight} onChange={e => setBrickworkInputs({...brickworkInputs, brickHeight: e.target.value})} placeholder="e.g., 0.075" className="bg-card border-input"/></div>
                  <div><Label htmlFor="brickWidth" className="text-foreground">Brick Width (m)</Label><Input id="brickWidth" type="number" value={brickworkInputs.brickWidth} onChange={e => setBrickworkInputs({...brickworkInputs, brickWidth: e.target.value})} placeholder="e.g., 0.115" className="bg-card border-input"/></div>
                  <div><Label htmlFor="mortarThickness" className="text-foreground">Mortar Thickness (m)</Label><Input id="mortarThickness" type="number" value={brickworkInputs.mortarThickness} onChange={e => setBrickworkInputs({...brickworkInputs, mortarThickness: e.target.value})} placeholder="e.g., 0.01" className="bg-card border-input"/></div>
                </div>
                <Button onClick={handleBrickworkCalculate} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Calculator className="mr-2 h-4 w-4"/> Calculate Bricks
                </Button>
                {brickworkResult && <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm text-foreground">{brickworkResult}</div>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
