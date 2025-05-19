'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search, MapPin, Phone, Mail } from "lucide-react";

interface Architect {
  id: string;
  name: string;
  firmName: string;
  city: string;
  specialization: string;
  contactEmail?: string;
  contactPhone?: string;
  avatarUrl?: string;
}

const sampleArchitects: Architect[] = [
  { id: 'A1', name: 'Ar. Priya Sharma', firmName: 'Design Innovations', city: 'Mumbai', specialization: 'Residential, Commercial', contactEmail: 'priya.sharma@designinnov.com', contactPhone: '9820098200', avatarUrl: 'https://placehold.co/100x100.png?text=PS' ,dataAihint: 'architect portrait' },
  { id: 'A2', name: 'Ar. Rajesh Mehta', firmName: 'Urban Planners Inc.', city: 'Delhi', specialization: 'Urban Design, Institutional', contactEmail: 'rajesh.mehta@urbanplan.in', avatarUrl: 'https://placehold.co/100x100.png?text=RM', dataAihint: 'architect sketch' },
  { id: 'A3', name: 'Ar. Ananya Reddy', firmName: 'Sustainable Spaces', city: 'Bangalore', specialization: 'Green Buildings, Landscape', contactPhone: '9845098450', dataAihint: 'sustainable architecture' },
];

export default function ArchitectsPage() {
  const [architects, setArchitects] = useState<Architect[]>(sampleArchitects);
  // TODO: Add form state and handler for adding new architects

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Find Architects</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search by name, firm, or city..." className="w-full md:w-64 bg-card border-input" />
          <Button variant="outline" className="border-input">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Architect
          </Button>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Architect Directory</CardTitle>
          <CardDescription>Connect with architects in your city or add your preferred ones.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architects.map((architect) => (
            <Card key={architect.id} className="bg-muted/30 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={architect.avatarUrl} alt={architect.name} data-ai-hint={architect.dataAihint || "architect person"}/>
                  <AvatarFallback>{architect.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg text-primary">{architect.name}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">{architect.firmName}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-accent" /> {architect.city}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2 text-accent" /> {architect.specialization} {/* Briefcase not imported, use a generic icon or import it */}
                </div>
                 {architect.contactEmail && <div className="flex items-center text-muted-foreground"><Mail className="h-4 w-4 mr-2 text-accent" /> {architect.contactEmail}</div>}
                 {architect.contactPhone && <div className="flex items-center text-muted-foreground"><Phone className="h-4 w-4 mr-2 text-accent" /> {architect.contactPhone}</div>}
              </CardContent>
              {/* <CardFooter className="pt-3">
                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10">Contact</Button>
              </CardFooter> */}
            </Card>
          ))}
          {architects.length === 0 && <p className="col-span-full text-center py-4 text-muted-foreground">No architects listed. Use the 'Add Architect' button to build your directory.</p>}
        </CardContent>
      </Card>
      
      {/* Placeholder for Add Architect Form/Modal */}
      {/* 
      <Card className="shadow-md mt-6">
        <CardHeader><CardTitle>Add New Architect (Placeholder)</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Form to add architect details will be here.</p></CardContent>
      </Card>
      */}
    </div>
  );
}

// Minimalist Briefcase icon if not importing full set
const Briefcase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);
