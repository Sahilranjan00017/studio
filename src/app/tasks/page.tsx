'use client';

import { useState, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, LoaderCircle, CheckCircle2, GripVertical, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  site: string;
  image?: string; // For Photo Capture feature
}

interface Column {
  id: 'todo' | 'inprogress' | 'completed';
  title: string;
  icon: ReactNode;
  tasks: Task[];
}

const initialTasks: Task[] = [
  { id: '1', title: 'Foundation Work - Site A', description: 'Excavation and concrete pouring for Building 1.', priority: 'high', site: 'Site A', dueDate: '2024-08-15', image: 'https://placehold.co/150x100.png' , dataAihint: 'foundation construction'},
  { id: '2', title: 'Bricklaying - Wall X', description: 'Complete north-facing wall section.', priority: 'medium', site: 'Site B', dueDate: '2024-08-20' },
  { id: '3', title: 'Plumbing Rough-in - Unit 5', description: 'Install initial plumbing lines.', priority: 'high', site: 'Site A', dueDate: '2024-08-25' },
  { id: '4', title: 'Electrical Wiring - Floor 2', description: 'Main circuit wiring for the second floor.', priority: 'medium', site: 'Site C', dueDate: '2024-09-01', image: 'https://placehold.co/150x100.png', dataAihint: 'electrical wiring' },
  { id: '5', title: 'QC Check - Slab Curing', description: 'Verify concrete curing parameters.', priority: 'low', site: 'Site B', dueDate: '2024-08-18' },
];

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', icon: <List className="mr-2 h-5 w-5 text-muted-foreground" />, tasks: initialTasks.filter(t => t.id === '1' || t.id === '4') },
  { id: 'inprogress', title: 'In Progress', icon: <LoaderCircle className="mr-2 h-5 w-5 text-blue-500 animate-spin" />, tasks: initialTasks.filter(t => t.id === '2' || t.id === '3') },
  { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />, tasks: initialTasks.filter(t => t.id === '5') },
];

const priorityColors = {
  low: 'bg-green-100 text-green-700 border-green-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  high: 'bg-red-100 text-red-700 border-red-300',
};

export default function TasksPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // Basic drag-and-drop functionality would be complex for this step.
  // This is a visual representation.

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Site Task Management</h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((column) => (
          <div key={column.id} className="bg-muted/50 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {column.icon}
                <h2 className="text-lg font-semibold text-foreground">{column.title}</h2>
              </div>
              <span className="text-sm font-medium text-muted-foreground bg-background px-2 py-1 rounded-full">{column.tasks.length}</span>
            </div>
            <div className="space-y-4 min-h-[200px]">
              {column.tasks.map((task) => (
                <Card key={task.id} className="bg-card shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing">
                  <CardHeader className="p-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold text-card-foreground leading-tight">{task.title}</CardTitle>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Assign User</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground">{task.site} {task.dueDate && `| Due: ${task.dueDate}`}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    {task.image && (
                       <div className="my-2 rounded overflow-hidden">
                         <img src={task.image} alt={task.title} className="w-full h-auto object-cover" data-ai-hint={task.dataAihint || "task image"} />
                       </div>
                    )}
                    <div className="flex items-center justify-between">
                       <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                      {/* Placeholder for assignee avatar */}
                      {task.assignee && <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">{task.assignee.substring(0,1)}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {column.tasks.length === 0 && (
                <div className="text-center text-muted-foreground py-8">No tasks here.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
