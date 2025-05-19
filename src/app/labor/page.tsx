
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, Edit3, Users, LinkIcon, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Laborer {
  id: string;
  name: string;
  skill: string; 
  dailyRate: number;
  contact?: string;
}

const initialLaborers: Laborer[] = [
  { id: 'L1', name: 'Ramesh Kumar', skill: 'Electrician', dailyRate: 800, contact: '9876543210' },
  { id: 'L2', name: 'Suresh Singh', skill: 'Plumber', dailyRate: 750, contact: '9876543211' },
  { id: 'L3', name: 'Deepak Verma', skill: 'Mason', dailyRate: 900 },
];

const externalLaborSites = [
    { name: "Apna", url: "https://apna.co/jobs/construction-jobs", description: "Platform for blue and grey collar jobs including construction." },
    { name: "QuikrJobs", url: "https://www.quikr.com/jobs/construction-labour+zwqox1673967439", description: "Classifieds site with job listings for laborers." },
    { name: "Naukri.com Construction", url: "https://www.naukri.com/construction-jobs", description: "Major job portal, search for construction skilled labor." },
];

export default function LaborPage() {
  const [laborers, setLaborers] = useState<Laborer[]>(initialLaborers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaborer, setEditingLaborer] = useState<Laborer | null>(null);
  
  const [laborerName, setLaborerName] = useState('');
  const [laborerSkill, setLaborerSkill] = useState('');
  const [laborerRate, setLaborerRate] = useState('');
  const [laborerContact, setLaborerContact] = useState('');
  const { toast } = useToast();

  const openAddModal = () => {
    setEditingLaborer(null);
    setLaborerName('');
    setLaborerSkill('');
    setLaborerRate('');
    setLaborerContact('');
    setIsModalOpen(true);
  };

  const openEditModal = (laborer: Laborer) => {
    setEditingLaborer(laborer);
    setLaborerName(laborer.name);
    setLaborerSkill(laborer.skill);
    setLaborerRate(String(laborer.dailyRate));
    setLaborerContact(laborer.contact || '');
    setIsModalOpen(true);
  };

  const handleSaveLaborer = () => {
    if (!laborerName || !laborerSkill || !laborerRate) {
        toast({ title: "Missing Fields", description: "Please fill all required fields for the laborer.", variant: "destructive" });
        return;
    }
    const rate = parseFloat(laborerRate);
    if (isNaN(rate) || rate <=0) {
        toast({ title: "Invalid Rate", description: "Daily rate must be a positive number.", variant: "destructive" });
        return;
    }

    if (editingLaborer) {
      setLaborers(laborers.map(l => l.id === editingLaborer.id ? { ...l, name: laborerName, skill: laborerSkill, dailyRate: rate, contact: laborerContact } : l));
      toast({ title: "Laborer Updated", description: `${laborerName} has been updated.` });
    } else {
      const newLaborer: Laborer = {
          id: `L${Date.now()}`, // More unique ID
          name: laborerName,
          skill: laborerSkill,
          dailyRate: rate,
          contact: laborerContact,
      };
      setLaborers([...laborers, newLaborer]);
      toast({ title: "Laborer Added", description: `${laborerName} has been added.` });
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteLaborer = (laborerId: string) => {
    setLaborers(laborers.filter(l => l.id !== laborerId));
    toast({ title: "Laborer Deleted", description: "The laborer has been removed.", variant: "destructive" });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Labor Management</h1>
        <Button onClick={openAddModal} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Laborer
        </Button>
      </div>

      <Tabs defaultValue="my-labor" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 md:w-auto mb-4 rounded-lg shadow-sm">
          <TabsTrigger value="my-labor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"><Users className="mr-2 h-4 w-4" />My Labor</TabsTrigger>
          <TabsTrigger value="external-resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"><LinkIcon className="mr-2 h-4 w-4" />External Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="my-labor">
          <Card className="shadow-xl rounded-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl text-foreground">My Laborers</CardTitle>
              <CardDescription className="text-muted-foreground">Manage your own team of laborers. Add, edit, or remove them here.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-foreground font-semibold px-4 py-3">Name</TableHead>
                      <TableHead className="text-foreground font-semibold px-4 py-3">Skill</TableHead>
                      <TableHead className="text-foreground font-semibold px-4 py-3">Daily Rate (₹)</TableHead>
                      <TableHead className="text-foreground font-semibold px-4 py-3">Contact</TableHead>
                      <TableHead className="text-right text-foreground font-semibold px-4 py-3">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laborers.map((laborer, index) => (
                      <TableRow key={laborer.id} className={`${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'} hover:bg-accent/20`}>
                        <TableCell className="font-medium text-foreground px-4 py-3">{laborer.name}</TableCell>
                        <TableCell className="text-muted-foreground px-4 py-3">{laborer.skill}</TableCell>
                        <TableCell className="text-muted-foreground px-4 py-3">{laborer.dailyRate.toFixed(2)}</TableCell>
                        <TableCell className="text-muted-foreground px-4 py-3">{laborer.contact || 'N/A'}</TableCell>
                        <TableCell className="text-right px-4 py-3">
                          <Button variant="ghost" size="icon" className="hover:text-accent-foreground text-muted-foreground mr-1" onClick={() => openEditModal(laborer)}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:text-destructive text-muted-foreground" onClick={() => handleDeleteLaborer(laborer.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {laborers.length === 0 && <p className="text-center py-8 text-muted-foreground">No laborers added yet. Click "Add Laborer" to start building your team.</p>}
            </CardContent>
             {laborers.length > 0 && <CardFooter className="border-t border-border p-4 justify-end">
                <p className="text-sm text-muted-foreground">Total Laborers: {laborers.length}</p>
            </CardFooter>}
          </Card>
        </TabsContent>
        <TabsContent value="external-resources">
          <Card className="shadow-xl rounded-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl text-foreground">External Labor Resources</CardTitle>
              <CardDescription className="text-muted-foreground">Links to websites and platforms where you can find laborers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
                {externalLaborSites.map(site => (
                    <Card key={site.name} className="bg-muted/30 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-md text-primary">{site.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{site.description}</p>
                            <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-sm hover:shadow-md">
                                <a href={site.url} target="_blank" rel="noopener noreferrer">Visit Site <ExternalLink className="ml-2 h-4 w-4"/></a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Laborer Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md bg-card rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">{editingLaborer ? 'Edit Laborer' : 'Add New Laborer'}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {editingLaborer ? 'Update the details for this laborer.' : 'Fill in the details for the new laborer.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-1">
                  <Label htmlFor="laborerName" className="text-foreground/90">Name</Label>
                  <Input id="laborerName" placeholder="Laborer's Full Name" value={laborerName} onChange={(e) => setLaborerName(e.target.value)} className="bg-input border-border shadow-sm rounded-md focus:ring-primary" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="laborerSkill" className="text-foreground/90">Skill/Trade</Label>
                  <Input id="laborerSkill" placeholder="e.g., Plumber, Electrician" value={laborerSkill} onChange={(e) => setLaborerSkill(e.target.value)} className="bg-input border-border shadow-sm rounded-md focus:ring-primary"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="laborerRate" className="text-foreground/90">Daily Rate (₹)</Label>
                  <Input id="laborerRate" type="number" placeholder="e.g., 700" value={laborerRate} onChange={(e) => setLaborerRate(e.target.value)} className="bg-input border-border shadow-sm rounded-md focus:ring-primary"/>
                </div>
                 <div className="space-y-1">
                  <Label htmlFor="laborerContact" className="text-foreground/90">Contact (Optional)</Label>
                  <Input id="laborerContact" placeholder="Phone number or other contact" value={laborerContact} onChange={(e) => setLaborerContact(e.target.value)} className="bg-input border-border shadow-sm rounded-md focus:ring-primary"/>
                </div>
            </div>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveLaborer} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                {editingLaborer ? 'Save Changes' : 'Add Laborer'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
