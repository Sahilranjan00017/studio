'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, Edit3, Users, LinkIcon } from "lucide-react";

interface Laborer {
  id: string;
  name: string;
  skill: string; // e.g., Plumber, Electrician, Mason, General
  dailyRate: number;
  contact?: string;
}

const initialLaborers: Laborer[] = [
  { id: 'L1', name: 'Ramesh Kumar', skill: 'Electrician', dailyRate: 800, contact: '9876543210' },
  { id: 'L2', name: 'Suresh Singh', skill: 'Plumber', dailyRate: 750, contact: '9876543211' },
  { id: 'L3', name: 'Deepak Verma', skill: 'Mason', dailyRate: 900 },
];

const externalLaborSites = [
    { name: " Apna", url: "https://apna.co/jobs/construction-jobs", description: "Platform for blue and grey collar jobs including construction." },
    { name: " QuikrJobs", url: "https://www.quikr.com/jobs/construction-labour+zwqox1673967439", description: "Classifieds site with job listings for laborers." },
    { name: " Naukri.com Construction", url: "https://www.naukri.com/construction-jobs", description: "Major job portal, search for construction skilled labor." },
];


export default function LaborPage() {
  const [laborers, setLaborers] = useState<Laborer[]>(initialLaborers);
  // Basic form state (example)
  const [newLaborerName, setNewLaborerName] = useState('');
  const [newLaborerSkill, setNewLaborerSkill] = useState('');
  const [newLaborerRate, setNewLaborerRate] = useState('');


  const handleAddLaborer = () => {
    if (!newLaborerName || !newLaborerSkill || !newLaborerRate) {
        alert("Please fill all fields for the new laborer."); // Replace with proper toast notification
        return;
    }
    const newLaborer: Laborer = {
        id: `L${laborers.length + 1}`,
        name: newLaborerName,
        skill: newLaborerSkill,
        dailyRate: parseFloat(newLaborerRate),
    };
    setLaborers([...laborers, newLaborer]);
    setNewLaborerName('');
    setNewLaborerSkill('');
    setNewLaborerRate('');
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Labor Management</h1>
      </div>

      <Tabs defaultValue="my-labor" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="my-labor"><Users className="mr-2 h-4 w-4" />My Labor</TabsTrigger>
          <TabsTrigger value="external-resources"><LinkIcon className="mr-2 h-4 w-4" />External Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="my-labor">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">My Laborers</CardTitle>
              <CardDescription>Manage your own team of laborers. Add, edit, or remove them here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 border rounded-lg bg-muted/30">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Add New Laborer</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label htmlFor="laborName" className="text-foreground">Name</Label>
                    <Input id="laborName" placeholder="Laborer's Name" value={newLaborerName} onChange={(e) => setNewLaborerName(e.target.value)} className="bg-card border-input"/>
                  </div>
                  <div>
                    <Label htmlFor="laborSkill" className="text-foreground">Skill/Trade</Label>
                    <Input id="laborSkill" placeholder="e.g., Plumber, Electrician" value={newLaborerSkill} onChange={(e) => setNewLaborerSkill(e.target.value)} className="bg-card border-input"/>
                  </div>
                  <div>
                    <Label htmlFor="laborRate" className="text-foreground">Daily Rate (₹)</Label>
                    <Input id="laborRate" type="number" placeholder="e.g., 700" value={newLaborerRate} onChange={(e) => setNewLaborerRate(e.target.value)} className="bg-card border-input"/>
                  </div>
                  <Button onClick={handleAddLaborer} className="bg-primary hover:bg-primary/90 text-primary-foreground md:self-end">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Laborer
                  </Button>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2 text-foreground">Laborer List</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Skill</TableHead>
                    <TableHead className="text-foreground">Daily Rate (₹)</TableHead>
                    <TableHead className="text-foreground">Contact</TableHead>
                    <TableHead className="text-right text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {laborers.map((laborer) => (
                    <TableRow key={laborer.id}>
                      <TableCell className="font-medium text-foreground">{laborer.name}</TableCell>
                      <TableCell className="text-muted-foreground">{laborer.skill}</TableCell>
                      <TableCell className="text-muted-foreground">{laborer.dailyRate.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground">{laborer.contact || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:text-accent-foreground">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {laborers.length === 0 && <p className="text-center py-4 text-muted-foreground">No laborers added yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="external-resources">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">External Labor Resources</CardTitle>
              <CardDescription>Links to websites and platforms where you can find laborers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {externalLaborSites.map(site => (
                    <Card key={site.name} className="bg-muted/30">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-md text-primary">{site.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-2">{site.description}</p>
                            <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-accent/90">
                                <a href={site.url} target="_blank" rel="noopener noreferrer">Visit Site <LinkIcon className="ml-1 h-3 w-3"/></a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
