'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface Tender {
  id: string;
  title: string;
  authority: string;
  city: string;
  state: string;
  category: string; // e.g., Road, Metro, Airport, Building
  value: string;
  closingDate: string;
}

const sampleTenders: Tender[] = [
  { id: '1', title: 'Construction of New Metro Line - Phase 3', authority: 'City Metro Rail Corp', city: 'Mumbai', state: 'Maharashtra', category: 'Metro', value: '₹500 Cr', closingDate: '2024-09-15' },
  { id: '2', title: 'Airport Expansion Project - Terminal 2', authority: 'Airport Authority of India', city: 'Delhi', state: 'Delhi', category: 'Airport', value: '₹1200 Cr', closingDate: '2024-10-01' },
  { id: '3', title: 'Widening of NH-48 Highway Stretch', authority: 'National Highways Authority', city: 'Bangalore', state: 'Karnataka', category: 'Road', value: '₹350 Cr', closingDate: '2024-08-30' },
  { id: '4', title: 'Development of Smart City Infrastructure', authority: 'City Development Authority', city: 'Pune', state: 'Maharashtra', category: 'Infrastructure', value: '₹800 Cr', closingDate: '2024-09-20' },
];

export default function TendersPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Government Tenders</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search tenders..." className="w-full md:w-64 bg-card border-input" />
          <Button variant="outline" className="border-input">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
          <Button variant="outline" className="border-input">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Available Tenders</CardTitle>
          <CardDescription>Browse government tenders for various construction projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sampleTenders.map(tender => (
            <Card key={tender.id} className="bg-muted/30 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary">{tender.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {tender.authority} | {tender.city}, {tender.state} | Category: {tender.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-semibold">Value: <span className="text-foreground">{tender.value}</span></p>
                  <p className="text-sm">Closing Date: <span className="text-foreground">{tender.closingDate}</span></p>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">View Details</Button>
              </CardContent>
            </Card>
          ))}
           {sampleTenders.length === 0 && <p className="text-muted-foreground">No tenders currently listed. Please check back later or adjust your filters.</p>}
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Filter Options (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select>
            <SelectTrigger className="w-full bg-card border-input"><SelectValue placeholder="Select State" /></SelectTrigger>
            <SelectContent><SelectItem value="mah">Maharashtra</SelectItem><SelectItem value="del">Delhi</SelectItem><SelectItem value="kar">Karnataka</SelectItem></SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full bg-card border-input"><SelectValue placeholder="Select City" /></SelectTrigger>
            <SelectContent><SelectItem value="mum">Mumbai</SelectItem><SelectItem value="del">Delhi</SelectItem><SelectItem value="blr">Bangalore</SelectItem></SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full bg-card border-input"><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="metro">Metro</SelectItem>
              <SelectItem value="airport">Airport</SelectItem>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="building">Building</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
