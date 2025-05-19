import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { FolderKanban, MapPin, ListTodo, IndianRupee, AlertTriangle } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";

const projectMetricsData = [
  { name: "Alpha", cost: 4000, progress: 60, delay: 5 },
  { name: "Beta", cost: 3000, progress: 40, delay: 2 },
  { name: "Gamma", cost: 2000, progress: 80, delay: 0 },
  { name: "Delta", cost: 2780, progress: 70, delay: 1 },
  { name: "Epsilon", cost: 1890, progress: 90, delay: 0 },
];

const chartConfig = {
  cost: {
    label: "Cost (₹ Lakhs)",
    color: "hsl(var(--chart-1))",
  },
  progress: {
    label: "Progress (%)",
    color: "hsl(var(--chart-2))",
  },
  delay: {
    label: "Delay (Days)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;


export default function DashboardPage() {
  const summaryStats = [
    { title: "Total Projects", value: "12", icon: FolderKanban, description: "Across all active sites" },
    { title: "Active Sites", value: "5", icon: MapPin, description: "Currently operational" },
    { title: "Pending Tasks", value: "34", icon: ListTodo, description: "Across all projects" },
    { title: "Budget Status", value: "₹1.2 Cr", icon: IndianRupee, description: "Total allocated budget" },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Project Costs & Progress</CardTitle>
            <CardDescription>Comparison of estimated costs and current progress per project.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={projectMetricsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `₹${value/1000}K`} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="cost" fill="var(--color-cost)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="progress" fill="var(--color-progress)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Project Delays</CardTitle>
            <CardDescription>Overview of project delays in days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={projectMetricsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `${value} Days`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="delay" fill="var(--color-delay)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Placeholder for Photo Capture examples or other relevant info */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Recent Site Photos</CardTitle>
          <CardDescription>Latest visual updates from project sites.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
             <div key={i} className="aspect-video bg-muted rounded-md overflow-hidden">
              <img 
                src={`https://placehold.co/300x200.png?text=Site+Photo+${i}`} 
                alt={`Site Photo ${i}`} 
                data-ai-hint="construction site"
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
