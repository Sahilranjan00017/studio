
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator } from "lucide-react";

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
    const bw = parseFloat(brickworkInputs.brickWidth); 
    const mt = parseFloat(brickworkInputs.mortarThickness);

    if (isNaN(wl) || isNaN(wh) || isNaN(bl) || isNaN(bh) || isNaN(bw) || isNaN(mt) || wl <= 0 || wh <= 0 || bl <= 0 || bh <= 0 || bw <=0 || mt < 0) {
        setBrickworkResult("Invalid inputs. Please enter positive numbers for dimensions and valid mortar thickness.");
        return;
    }
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

      <Accordion type="single" collapsible className="w-full space-y-4">
        {[
          { 
            value: "concrete", 
            title: "Concrete Calculator", 
            description: "Estimate concrete volume and materials.",
            inputs: [
              {id: "concreteLength", label: "Length (m)", placeholder: "e.g., 10", value: concreteInputs.length, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConcreteInputs({...concreteInputs, length: e.target.value})},
              {id: "concreteWidth", label: "Width (m)", placeholder: "e.g., 5", value: concreteInputs.width, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConcreteInputs({...concreteInputs, width: e.target.value})},
              {id: "concreteThickness", label: "Thickness (m)", placeholder: "e.g., 0.15", value: concreteInputs.thickness, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConcreteInputs({...concreteInputs, thickness: e.target.value})},
              {id: "concreteGrade", label: "Concrete Grade", placeholder: "e.g., M20", value: concreteInputs.grade, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConcreteInputs({...concreteInputs, grade: e.target.value})},
            ],
            onCalculate: handleConcreteCalculate,
            result: concreteResult,
            buttonLabel: "Calculate Concrete"
          },
          { 
            value: "flooring", 
            title: "Flooring (Tiles) Calculator", 
            description: "Estimate number of tiles needed for flooring.",
            inputs: [
              {id: "floorArea", label: "Area (sq m)", placeholder: "e.g., 50", value: flooringInputs.area, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFlooringInputs({...flooringInputs, area: e.target.value})},
              {id: "tileLength", label: "Tile Length (m)", placeholder: "e.g., 0.6", value: flooringInputs.tileLength, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFlooringInputs({...flooringInputs, tileLength: e.target.value})},
              {id: "tileWidth", label: "Tile Width (m)", placeholder: "e.g., 0.6", value: flooringInputs.tileWidth, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFlooringInputs({...flooringInputs, tileWidth: e.target.value})},
              {id: "wastage", label: "Wastage (%)", placeholder: "e.g., 10", value: flooringInputs.wastage, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFlooringInputs({...flooringInputs, wastage: e.target.value})},
            ],
            onCalculate: handleFlooringCalculate,
            result: flooringResult,
            buttonLabel: "Calculate Tiles"
          },
          { 
            value: "brickwork", 
            title: "Brickwork Calculator", 
            description: "Estimate number of bricks for a wall.",
            inputs: [
              {id: "wallLength", label: "Wall Length (m)", placeholder: "e.g., 10", value: brickworkInputs.wallLength, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrickworkInputs({...brickworkInputs, wallLength: e.target.value})},
              {id: "wallHeight", label: "Wall Height (m)", placeholder: "e.g., 3", value: brickworkInputs.wallHeight, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrickworkInputs({...brickworkInputs, wallHeight: e.target.value})},
              {id: "brickLength", label: "Brick Length (m)", placeholder: "e.g., 0.23", value: brickworkInputs.brickLength, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrickworkInputs({...brickworkInputs, brickLength: e.target.value})},
              {id: "brickHeight", label: "Brick Height (m)", placeholder: "e.g., 0.075", value: brickworkInputs.brickHeight, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrickworkInputs({...brickworkInputs, brickHeight: e.target.value})},
              {id: "brickWidth", label: "Brick Width (m)", placeholder: "e.g., 0.115", value: brickworkInputs.brickWidth, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrickworkInputs({...brickworkInputs, brickWidth: e.target.value})},
              {id: "mortarThickness", label: "Mortar Thickness (m)", placeholder: "e.g., 0.01", value: brickworkInputs.mortarThickness, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrickworkInputs({...brickworkInputs, mortarThickness: e.target.value})},
            ],
            onCalculate: handleBrickworkCalculate,
            result: brickworkResult,
            buttonLabel: "Calculate Bricks"
          }
        ].map(calculator => (
          <AccordionItem value={calculator.value} key={calculator.value} className="border bg-card shadow-lg rounded-lg overflow-hidden">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline hover:text-primary p-6">
              {calculator.title}
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <Card className="shadow-none border-none">
                <CardHeader className="p-0 pb-4">
                  <CardDescription className="text-muted-foreground">{calculator.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-0">
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${calculator.inputs.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4`}>
                    {calculator.inputs.map(input => (
                      <div key={input.id} className="space-y-1">
                        <Label htmlFor={input.id} className="text-foreground/90">{input.label}</Label>
                        <Input 
                          id={input.id} 
                          type="number" 
                          value={input.value} 
                          onChange={input.onChange} 
                          placeholder={input.placeholder} 
                          className="bg-input border-border shadow-sm rounded-md focus:ring-primary"
                        />
                      </div>
                    ))}
                  </div>
                  <Button onClick={calculator.onCalculate} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                    <Calculator className="mr-2 h-4 w-4"/> {calculator.buttonLabel}
                  </Button>
                  {calculator.result && <div className="mt-4 p-4 bg-muted/50 rounded-md text-sm text-foreground border border-border shadow-inner">{calculator.result}</div>}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
