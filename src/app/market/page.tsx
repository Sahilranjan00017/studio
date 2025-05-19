'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Store, MapPin, TrendingUp, Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const priceTrendData = [
  { month: "Jan", steel: 55000, cement: 380, sand: 1200 },
  { month: "Feb", steel: 56000, cement: 385, sand: 1250 },
  { month: "Mar", steel: 57500, cement: 390, sand: 1220 },
  { month: "Apr", steel: 57000, cement: 395, sand: 1300 },
  { month: "May", steel: 58000, cement: 400, sand: 1350 },
  { month: "Jun", steel: 58500, cement: 405, sand: 1320 },
];

const chartConfig = {
  steel: { label: "Steel (₹/tonne)", color: "hsl(var(--chart-1))" },
  cement: { label: "Cement (₹/bag)", color: "hsl(var(--chart-2))" },
  sand: { label: "Sand (₹/tonne)", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const topSuppliers = {
    steel: [
        { name: "Tata Steel", logo: "https://placehold.co/100x50.png?text=Tata+Steel", dataAihint: "company logo" },
        { name: "JSW Steel", logo: "https://placehold.co/100x50.png?text=JSW+Steel", dataAihint: "company logo" },
        { name: "SAIL", logo: "https://placehold.co/100x50.png?text=SAIL", dataAihint: "company logo" },
        { name: "Jindal Steel", logo: "https://placehold.co/100x50.png?text=Jindal", dataAihint: "company logo" },
        { name: "AM/NS India", logo: "https://placehold.co/100x50.png?text=AMNS", dataAihint: "company logo" },
    ],
    cement: [
        { name: "UltraTech Cement", logo: "https://placehold.co/100x50.png?text=UltraTech", dataAihint: "company logo" },
        { name: "Ambuja Cement", logo: "https://placehold.co/100x50.png?text=Ambuja", dataAihint: "company logo" },
        { name: "ACC Limited", logo: "https://placehold.co/100x50.png?text=ACC", dataAihint: "company logo" },
        { name: "Shree Cement", logo: "https://placehold.co/100x50.png?text=Shree", dataAihint: "company logo" },
        { name: "Dalmia Bharat", logo: "https://placehold.co/100x50.png?text=Dalmia", dataAihint: "company logo" },
    ],
    sand: [ // Sand suppliers are often local, these are more illustrative of type
        { name: "Local River Sand Suppliers", logo: "https://placehold.co/100x50.png?text=River+Sand", dataAihint: "sand quarry" },
        { name: "Manufactured Sand (M-Sand) Producers", logo: "https://placehold.co/100x50.png?text=M-Sand", dataAihint: "crusher plant" },
        { name: "Regional Quarry Operators", logo: "https://placehold.co/100x50.png?text=Quarry", dataAihint: "stone quarry" },
        { name: "State Mineral Development Corp.", logo: "https://placehold.co/100x50.png?text=State+Corp", dataAihint: "government building" },
        { name: "Online B2B Marketplaces", logo: "https://placehold.co/100x50.png?text=B2B+Portal", dataAihint: "logistic truck" },
    ]
};


export default function MarketPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Market Prices & Suppliers</h1>
        <Store className="h-8 w-8 text-primary" />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-accent"/> Material Price Trends</CardTitle>
          <CardDescription>Monthly average prices for key construction materials.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={priceTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
              <YAxis yAxisId="left" stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `₹${value/1000}K`} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="steel" fill="var(--color-steel)" radius={[4, 4, 0, 0]} name="Steel" />
              {/* For Cement and Sand, their values are much smaller. Consider a separate chart or different y-axis scaling if plotted together in a real scenario. 
                  Here, they will be very small bars if on the same Y-axis as steel.
                  Alternative: use a line chart and multiple y-axes for better visualization of disparate scales.
                  For simplicity in this placeholder, they are included but may not be visually prominent.
              */}
              {/* <Bar yAxisId="right" dataKey="cement" fill="var(--color-cement)" radius={[4, 4, 0, 0]} name="Cement" />
              <Bar yAxisId="right" dataKey="sand" fill="var(--color-sand)" radius={[4, 4, 0, 0]} name="Sand" /> */}
            </BarChart>
          </ChartContainer>
          <CardDescription className="text-xs text-center mt-2">Note: Cement and Sand prices are on a different scale than Steel. Consider separate charts for detailed analysis.</CardDescription>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><MapPin className="mr-2 h-5 w-5 text-accent"/> Nearby Suppliers (Map Integration)</CardTitle>
          <CardDescription>Find material suppliers in your area. (Bing Maps integration placeholder)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Enter your city or pincode to find suppliers..." className="bg-card border-input"/>
            <Button className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Search className="mr-2 h-4 w-4"/> Find Suppliers
            </Button>
          </div>
          <div 
            className="h-[400px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground"
            data-ai-hint="map location"
            >
            <p>Bing Maps Placeholder - API Key and integration required.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><Building2 className="mr-2 h-5 w-5 text-accent"/> Top Material Suppliers (India)</CardTitle>
          <CardDescription>Overview of major suppliers for key materials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Top 5 Steel Companies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {topSuppliers.steel.map(s => (
                        <div key={s.name} className="flex flex-col items-center p-2 border rounded-md bg-muted/30">
                            <img src={s.logo} alt={s.name} className="h-10 mb-2 object-contain" data-ai-hint={s.dataAihint}/>
                            <p className="text-xs text-center text-muted-foreground">{s.name}</p>
                        </div>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Top 5 Cement Companies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {topSuppliers.cement.map(s => (
                        <div key={s.name} className="flex flex-col items-center p-2 border rounded-md bg-muted/30">
                            <img src={s.logo} alt={s.name} className="h-10 mb-2 object-contain" data-ai-hint={s.dataAihint}/>
                            <p className="text-xs text-center text-muted-foreground">{s.name}</p>
                        </div>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Key Sand Supplier Types</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {topSuppliers.sand.map(s => (
                        <div key={s.name} className="flex flex-col items-center p-2 border rounded-md bg-muted/30">
                            <img src={s.logo} alt={s.name} className="h-10 mb-2 object-contain" data-ai-hint={s.dataAihint}/>
                            <p className="text-xs text-center text-muted-foreground">{s.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
