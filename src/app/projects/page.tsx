
'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, LoaderCircle, CheckCircle2, PauseCircle, MoreHorizontal, IndianRupee, Landmark, Users, CalendarDays, GripVertical } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ProjectTask {
  id: string;
  name: string;
  completed: boolean;
}

interface ProjectTower {
  id: string;
  name: string;
  floors: number;
  flatsPerFloor: number;
}

type ProjectStatus = 'todo' | 'inprogress' | 'paused' | 'completed';

interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  budget: number;
  spent: number;
  startDate?: string;
  endDate?: string;
  remainingPayment?: number;
  towers?: ProjectTower[];
  tasks?: ProjectTask[]; 
  imageUrl?: string;
  dataAihint?: string;
}

interface Column {
  id: ProjectStatus;
  title: string;
  icon: ReactNode;
  projects: Project[];
}

const sampleProjects: Project[] = [
  { id: 'P1', name: 'Greenwood Residency', status: 'inprogress', description: 'Luxury apartments with 3 towers, premium amenities, and landscaped gardens.', budget: 50000000, spent: 23000000, startDate: '2023-01-15', remainingPayment: 10000000, towers: [{id: 'T1', name: 'Tower A', floors: 12, flatsPerFloor: 4}], imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'apartment building' },
  { id: 'P2', name: 'City Mall Expansion', status: 'todo', description: 'Adding a new retail wing, multiplex, and multi-level car parking.', budget: 120000000, spent: 5000000, startDate: '2024-03-01', imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'shopping mall' },
  { id: 'P3', name: 'Highway Interchange Upgrade', status: 'paused', description: 'Construction paused pending environmental clearances and land acquisition.', budget: 80000000, spent: 15000000, startDate: '2022-06-10', imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'highway construction' },
  { id: 'P4', name: 'Tech Park - Phase 1', status: 'completed', description: 'Interior fitouts and landscaping for Block A completed ahead of schedule.', budget: 30000000, spent: 29500000, endDate: '2023-12-20', imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'office complex' },
];

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do / Upcoming', icon: <List className="mr-2 h-5 w-5 text-muted-foreground" />, projects: sampleProjects.filter(p => p.status === 'todo') },
  { id: 'inprogress', title: 'In Progress', icon: <LoaderCircle className="mr-2 h-5 w-5 text-primary animate-spin" />, projects: sampleProjects.filter(p => p.status === 'inprogress') },
  { id: 'paused', title: 'Paused / On Hold', icon: <PauseCircle className="mr-2 h-5 w-5 text-yellow-500" />, projects: sampleProjects.filter(p => p.status === 'paused') },
  { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />, projects: sampleProjects.filter(p => p.status === 'completed') },
];

export default function ProjectsPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Add form state for new project if needed
  const { toast } = useToast();

  // TODO: Implement drag and drop functionality later

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Management</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((column) => (
          <div key={column.id} className="bg-muted/20 p-4 rounded-xl shadow-lg"> {/* Enhanced column styling */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <div className="flex items-center">
                {column.icon}
                <h2 className="text-xl font-semibold text-foreground ml-2">{column.title}</h2>
              </div>
              <span className="text-sm font-medium text-foreground bg-card px-3 py-1 rounded-full shadow-sm">{column.projects.length}</span>
            </div>
            <div className="space-y-4 min-h-[300px] max-h-[calc(100vh-20rem)] overflow-y-auto pr-2"> {/* Added max-height and overflow */}
              {column.projects.map((project) => (
                <Card key={project.id} className="bg-card shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-grab active:cursor-grabbing">
                  {project.imageUrl && (
                    <div className="aspect-[16/9] relative">
                        <Image 
                            src={project.imageUrl} 
                            alt={project.name} 
                            fill
                            className="object-cover" 
                            data-ai-hint={project.dataAihint || "construction project"} />
                    </div>
                  )}
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-foreground leading-tight">{project.name}</CardTitle>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border shadow-xl rounded-md">
                          <DropdownMenuItem className="hover:bg-accent/50">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-accent/50">Edit Project</DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem className="text-destructive focus:text-destructive hover:bg-destructive/10">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span className="font-medium text-foreground">{((project.spent / project.budget) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(project.spent / project.budget) * 100} className="h-2 bg-muted shadow-inner rounded-full" indicatorClassName="bg-primary rounded-full" />
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-3">
                        <p className="flex items-center"><IndianRupee className="inline h-3.5 w-3.5 mr-1.5 text-accent"/> Budget: <span className="font-medium text-foreground ml-1">₹{project.budget.toLocaleString()}</span></p>
                        <p className="flex items-center"><Landmark className="inline h-3.5 w-3.5 mr-1.5 text-accent"/> Spent: <span className="font-medium text-foreground ml-1">₹{project.spent.toLocaleString()}</span></p>
                        {project.remainingPayment && <p className="flex items-center text-green-600 dark:text-green-400"><IndianRupee className="inline h-3.5 w-3.5 mr-1.5"/>Payment Due: <span className="font-medium ml-1">₹{project.remainingPayment.toLocaleString()}</span></p>}
                    </div>
                    {project.towers && project.towers.length > 0 && (
                        <div className="text-xs text-muted-foreground border-t border-border pt-3">
                           <p className="font-medium text-foreground/80 mb-1">Towers:</p>
                           <ul className="list-disc list-inside pl-1 space-y-0.5">
                            {project.towers.map(t => <li key={t.id}>{t.name} ({t.floors} fl, {t.flatsPerFloor} units/fl)</li>)}
                           </ul>
                        </div>
                    )}
                     <div className="text-xs text-muted-foreground border-t border-border pt-3">
                        {project.startDate && <p className="flex items-center"><CalendarDays className="inline h-3.5 w-3.5 mr-1.5 text-accent"/> Started: <span className="font-medium text-foreground ml-1">{project.startDate}</span></p>}
                        {project.status === 'completed' && project.endDate && <p className="flex items-center"><CalendarDays className="inline h-3.5 w-3.5 mr-1.5 text-accent"/>Completed: <span className="font-medium text-foreground ml-1">{project.endDate}</span></p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {column.projects.length === 0 && (
                <div className="text-center text-muted-foreground py-10">No projects in this stage.</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Project Modal Placeholder */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-lg bg-card rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Project</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill in the details for the new project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                {/* Example form fields - to be implemented with react-hook-form */}
                <div className="space-y-1">
                  <Label htmlFor="projectName" className="text-foreground/90">Project Name</Label>
                  <Input id="projectName" placeholder="e.g., Sunrise Apartments" className="bg-input border-border shadow-sm rounded-md focus:ring-primary" />
                </div>
                 <div className="space-y-1">
                  <Label htmlFor="projectDescription" className="text-foreground/90">Description</Label>
                  <Textarea id="projectDescription" placeholder="Brief description of the project..." className="bg-input border-border shadow-sm rounded-md min-h-[100px] focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="projectBudget" className="text-foreground/90">Budget (₹)</Label>
                        <Input id="projectBudget" type="number" placeholder="e.g., 5000000" className="bg-input border-border shadow-sm rounded-md focus:ring-primary" />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="projectStartDate" className="text-foreground/90">Start Date</Label>
                        <Input id="projectStartDate" type="date" className="bg-input border-border shadow-sm rounded-md focus:ring-primary" />
                    </div>
                </div>
                 {/* Add more fields as needed: imageUrl, dataAihint, towers, etc. */}
            </div>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">Cancel</Button>
              </DialogClose>
              <Button onClick={() => { /* Handle project save */ setIsModalOpen(false); toast({title: "Project Added (Placeholder)", description: "Project details saved."}) }} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
                Add Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
