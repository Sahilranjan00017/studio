
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search, MapPin, Phone, Mail, Building, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";


interface Architect {
  id: string;
  name: string;
  firmName: string;
  city: string;
  specialization: string;
  contactEmail?: string;
  contactPhone?: string;
  avatarUrl?: string;
  dataAihint?: string; 
}

const sampleArchitects: Architect[] = [
  { id: 'A1', name: 'Ar. Priya Sharma', firmName: 'Design Innovations', city: 'Mumbai', specialization: 'Residential, Commercial', contactEmail: 'priya.sharma@designinnov.com', contactPhone: '9820098200', avatarUrl: 'https://placehold.co/100x100.png', dataAihint: 'architect portrait' },
  { id: 'A2', name: 'Ar. Rajesh Mehta', firmName: 'Urban Planners Inc.', city: 'Delhi', specialization: 'Urban Design, Institutional', contactEmail: 'rajesh.mehta@urbanplan.in', avatarUrl: 'https://placehold.co/100x100.png', dataAihint: 'architect sketch' },
  { id: 'A3', name: 'Ar. Ananya Reddy', firmName: 'Sustainable Spaces', city: 'Bangalore', specialization: 'Green Buildings, Landscape', contactPhone: '9845098450', avatarUrl: 'https://placehold.co/100x100.png', dataAihint: 'sustainable architecture' },
  { id: 'A4', name: 'Ar. Vikram Singh', firmName: 'Modern Aesthetics', city: 'Pune', specialization: 'Corporate, Hospitality', avatarUrl: 'https://placehold.co/100x100.png', dataAihint: 'modern building' },
];

export default function ArchitectsPage() {
  const [architects, setArchitects] = useState<Architect[]>(sampleArchitects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form states for adding new architect
  const [newName, setNewName] = useState('');
  const [newFirmName, setNewFirmName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [newAiHint, setNewAiHint] = useState('');
  const { toast } = useToast();


  const handleAddArchitect = () => {
    if (!newName || !newFirmName || !newCity || !newSpecialization) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const newArchitect: Architect = {
      id: `A${architects.length + Date.now()}`,
      name: newName,
      firmName: newFirmName,
      city: newCity,
      specialization: newSpecialization,
      contactEmail: newEmail || undefined,
      contactPhone: newPhone || undefined,
      avatarUrl: newAvatarUrl || `https://placehold.co/100x100.png?text=${newName.substring(0,2).toUpperCase()}`,
      dataAihint: newAiHint || "architect person"
    };
    setArchitects(prev => [newArchitect, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setNewName(''); setNewFirmName(''); setNewCity(''); setNewSpecialization(''); setNewEmail(''); setNewPhone(''); setNewAvatarUrl(''); setNewAiHint('');
    toast({ title: "Architect Added", description: `${newName} has been added to the directory.` });
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 md:space-x-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Find Architects</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search by name, firm, or city..." className="w-full md:w-64 bg-card border-input shadow-sm rounded-md focus:ring-primary" />
          <Button variant="outline" className="border-input shadow-sm hover:shadow-md transition-shadow">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Architect
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-card rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-foreground">Add New Architect</DialogTitle>
                    <DialogDescription className="text-muted-foreground">Enter the details of the new architect.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="space-y-1"><Label htmlFor="arcName" className="text-foreground/90">Name</Label><Input id="arcName" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ar. Full Name" className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcFirm" className="text-foreground/90">Firm Name</Label><Input id="arcFirm" value={newFirmName} onChange={e => setNewFirmName(e.target.value)} placeholder="Architectural Firm Pvt. Ltd." className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcCity" className="text-foreground/90">City</Label><Input id="arcCity" value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="e.g., Mumbai" className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcSpec" className="text-foreground/90">Specialization</Label><Input id="arcSpec" value={newSpecialization} onChange={e => setNewSpecialization(e.target.value)} placeholder="e.g., Residential, Commercial" className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcEmail" className="text-foreground/90">Email (Optional)</Label><Input id="arcEmail" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="architect@example.com" className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcPhone" className="text-foreground/90">Phone (Optional)</Label><Input id="arcPhone" type="tel" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="9876543210" className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcAvatar" className="text-foreground/90">Avatar URL (Optional)</Label><Input id="arcAvatar" value={newAvatarUrl} onChange={e => setNewAvatarUrl(e.target.value)} placeholder="https://placehold.co/100x100.png" className="bg-input border-border shadow-sm rounded-md"/></div>
                    <div className="space-y-1"><Label htmlFor="arcAiHint" className="text-foreground/90">AI Hint for Avatar (Optional)</Label><Input id="arcAiHint" value={newAiHint} onChange={e => setNewAiHint(e.target.value)} placeholder="e.g., architect portrait" className="bg-input border-border shadow-sm rounded-md"/></div>
                </div>
                <DialogFooter className="pt-4">
                    <DialogClose asChild><Button type="button" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">Cancel</Button></DialogClose>
                    <Button onClick={handleAddArchitect} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">Add Architect</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="shadow-xl rounded-lg">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl text-foreground">Architect Directory</CardTitle>
          <CardDescription className="text-muted-foreground">Connect with architects in your city or add your preferred ones.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {architects.map((architect) => (
            <Card key={architect.id} className="bg-card shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center space-x-4 p-4 bg-muted/20 border-b border-border">
                <Avatar className="h-20 w-20 border-2 border-primary/50 shadow-md">
                  <AvatarImage src={architect.avatarUrl} alt={architect.name} data-ai-hint={architect.dataAihint || "architect person"}/>
                  <AvatarFallback className="text-lg bg-primary/20 text-primary font-semibold">{architect.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg text-primary font-semibold">{architect.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground flex items-center"><Building className="h-4 w-4 mr-1.5 text-accent/80" /> {architect.firmName}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-accent" /> {architect.city}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2 text-accent" /> {architect.specialization}
                </div>
                 {architect.contactEmail && <div className="flex items-center text-muted-foreground truncate"><Mail className="h-4 w-4 mr-2 text-accent flex-shrink-0" /> <a href={`mailto:${architect.contactEmail}`} className="hover:text-primary truncate">{architect.contactEmail}</a></div>}
                 {architect.contactPhone && <div className="flex items-center text-muted-foreground"><Phone className="h-4 w-4 mr-2 text-accent flex-shrink-0" /> <a href={`tel:${architect.contactPhone}`} className="hover:text-primary">{architect.contactPhone}</a></div>}
              </CardContent>
              <CardFooter className="p-4 border-t border-border bg-muted/20">
                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-sm hover:shadow-md">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
          {architects.length === 0 && <p className="col-span-full text-center py-10 text-muted-foreground">No architects listed. Use the 'Add Architect' button to build your directory.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
