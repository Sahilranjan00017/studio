'use client';

import { useState, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, LoaderCircle, CheckCircle2, PauseCircle, AlertTriangle, GripVertical, MoreHorizontal, IndianRupee, Landmark, Users, CalendarDays } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface Project {
  id: string;
  name: string;
  status: 'todo' | 'inprogress' | 'paused' | 'completed';
  description: string;
  budget: number;
  spent: number;
  startDate?: string;
  endDate?: string;
  remainingPayment?: number;
  towers?: ProjectTower[];
  tasks?: ProjectTask[]; // Simplified task list for overview
  imageUrl?: string;
  dataAihint?: string;
}

interface Column {
  id: 'todo' | 'inprogress' | 'paused' | 'completed';
  title: string;
  icon: ReactNode;
  projects: Project[];
}

const sampleProjects: Project[] = [
  { id: 'P1', name: 'Greenwood Residency', status: 'inprogress', description: 'Luxury apartments with 3 towers.', budget: 50000000, spent: 23000000, startDate: '2023-01-15', remainingPayment: 10000000, towers: [{id: 'T1', name: 'Tower A', floors: 12, flatsPerFloor: 4}], imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'apartment building' },
  { id: 'P2', name: 'City Mall Expansion', status: 'todo', description: 'Adding new wing and parking.', budget: 120000000, spent: 5000000, startDate: '2024-03-01', imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'shopping mall' },
  { id: 'P3', name: 'Highway Interchange', status: 'paused', description: 'Paused due to approvals.', budget: 80000000, spent: 15000000, startDate: '2022-06-10', imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'highway construction' },
  { id: 'P4', name: 'Office Complex - Phase 1', status: 'completed', description: 'Interior fitouts completed.', budget: 30000000, spent: 29500000, endDate: '2023-12-20', imageUrl: 'https://placehold.co/600x400.png', dataAihint: 'office complex' },
];

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do / Upcoming', icon: <List className="mr-2 h-5 w-5 text-muted-foreground" />, projects: sampleProjects.filter(p => p.status === 'todo') },
  { id: 'inprogress', title: 'In Progress', icon: <LoaderCircle className="mr-2 h-5 w-5 text-blue-500 animate-spin" />, projects: sampleProjects.filter(p => p.status === 'inprogress') },
  { id: 'paused', title: 'Paused / On Hold', icon: <PauseCircle className="mr-2 h-5 w-5 text-yellow-500" />, projects: sampleProjects.filter(p => p.status === 'paused') },
  { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />, projects: sampleProjects.filter(p => p.status === 'completed') },
];


export default function ProjectsPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Management</h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((column) => (
          <div key={column.id} className="bg-muted/30 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {column.icon}
                <h2 className="text-lg font-semibold text-foreground">{column.title}</h2>
              </div>
              <span className="text-sm font-medium text-muted-foreground bg-card px-2 py-1 rounded-full">{column.projects.length}</span>
            </div>
            <div className="space-y-4 min-h-[300px]">
              {column.projects.map((project) => (
                <Card key={project.id} className="bg-card shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing">
                  {project.imageUrl && (
                    <div className="aspect-[16/9] rounded-t-lg overflow-hidden">
                        <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" data-ai-hint={project.dataAihint || "construction project"} />
                    </div>
                  )}
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold text-card-foreground leading-tight">{project.name}</CardTitle>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground mt-1">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{((project.spent / project.budget) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                        <p><IndianRupee className="inline h-3 w-3 mr-1"/> Budget: ₹{project.budget.toLocaleString()}</p>
                        <p><Landmark className="inline h-3 w-3 mr-1"/> Spent: ₹{project.spent.toLocaleString()}</p>
                        {project.remainingPayment && <p className="text-green-600"><IndianRupee className="inline h-3 w-3 mr-1"/>Stage Payment Due: ₹{project.remainingPayment.toLocaleString()}</p>}
                    </div>
                    {project.towers && project.towers.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                            Towers: {project.towers.map(t => `${t.name} (${t.floors} fl, ${t.flatsPerFloor} units/fl)`).join(', ')}
                        </div>
                    )}
                     <div className="text-xs text-muted-foreground">
                        {project.startDate && <p><CalendarDays className="inline h-3 w-3 mr-1"/> Started: {project.startDate}</p>}
                        {project.status === 'completed' && project.endDate && <p><CalendarDays className="inline h-3 w-3 mr-1"/>Completed: {project.endDate}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {column.projects.length === 0 && (
                <div className="text-center text-muted-foreground py-8">No projects in this stage.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
