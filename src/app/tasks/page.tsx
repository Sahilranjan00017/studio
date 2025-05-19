
'use client';

import { useState, type ReactNode, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { PlusCircle, List, LoaderCircle, CheckCircle2, MoreHorizontal, CalendarIcon, Filter, Trash2, Edit3, GripVertical, Camera } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';


interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: Date;
  site: string;
  image?: string; // stores the data URI of the uploaded image
  dataAihint?: string;
  status: 'todo' | 'inprogress' | 'completed';
}

const initialTasksData: Task[] = [
  { id: '1', title: 'Foundation Work - Site A', description: 'Excavation and concrete pouring for Building 1.', priority: 'high', site: 'Site A', assignee: "R. Sharma", dueDate: new Date('2024-08-15'), image: 'https://placehold.co/300x200.png', dataAihint: 'foundation construction', status: 'todo' },
  { id: '2', title: 'Bricklaying - Wall X', description: 'Complete north-facing wall section.', priority: 'medium', site: 'Site B', assignee: "S. Patel", dueDate: new Date('2024-08-20'), status: 'inprogress' },
  { id: '3', title: 'Plumbing Rough-in - Unit 5', description: 'Install initial plumbing lines for all bathrooms in Unit 5.', priority: 'high', site: 'Site A', assignee: "A. Kumar", dueDate: new Date('2024-08-25'), status: 'inprogress' },
  { id: '4', title: 'Electrical Wiring - Floor 2', description: 'Main circuit wiring for the second floor, including all outlets and light fixtures.', priority: 'medium', site: 'Site C', assignee: "M. Reddy", dueDate: new Date('2024-09-01'), image: 'https://placehold.co/300x200.png', dataAihint: 'electrical wiring', status: 'todo' },
  { id: '5', title: 'QC Check - Slab Curing', description: 'Verify concrete curing parameters and strength tests for recently poured slab C.', priority: 'low', site: 'Site B', assignee: "V. Singh", dueDate: new Date('2024-08-18'), status: 'completed' },
];

interface Column {
  id: 'todo' | 'inprogress' | 'completed';
  title: string;
  icon: ReactNode;
  tasks: Task[];
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-700/20 dark:text-green-300 dark:border-green-600',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-700/20 dark:text-yellow-300 dark:border-yellow-600',
  high: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-700/20 dark:text-red-300 dark:border-red-600',
};

const taskFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100, {message: "Title must be less than 100 characters."}),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }).max(500, {message: "Description must be less than 500 characters."}),
  priority: z.enum(['low', 'medium', 'high']),
  site: z.string().min(1, { message: "Site is required." }).max(50, {message: "Site name must be less than 50 characters."}),
  assignee: z.string().optional().or(z.literal('')),
  dueDate: z.date().optional(),
  imageFile: z.instanceof(File).optional().refine(file => !file || file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB.' })
    .refine(file => !file || ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type), { message: 'Only .jpg, .jpeg, .png, .webp and .gif formats are supported.' }),
  dataAihint: z.string().max(50, {message: "AI Hint must be less than 50 characters."}).optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasksData);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      site: '',
      assignee: '',
      dataAihint: '',
    },
  });

  const uniqueSites = Array.from(new Set(initialTasksData.map(task => task.site))); // Based on initial data to populate filter

  useEffect(() => {
    let filteredTasks = tasks;
    if (siteFilter !== "all") {
      filteredTasks = filteredTasks.filter(task => task.site === siteFilter);
    }
    if (priorityFilter !== "all") {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.assignee && task.assignee.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setColumns([
      { id: 'todo', title: 'To Do', icon: <List className="mr-2 h-5 w-5 text-muted-foreground" />, tasks: filteredTasks.filter(t => t.status === 'todo') },
      { id: 'inprogress', title: 'In Progress', icon: <LoaderCircle className="mr-2 h-5 w-5 text-primary animate-spin" />, tasks: filteredTasks.filter(t => t.status === 'inprogress') },
      { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />, tasks: filteredTasks.filter(t => t.status === 'completed') },
    ]);
  }, [tasks, siteFilter, priorityFilter, searchTerm]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, onChange: (file?: File) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const onSubmitTask: SubmitHandler<TaskFormValues> = async (data) => {
    let imageBase64: string | undefined = undefined;
    if (data.imageFile) {
      imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(data.imageFile!);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }

    const newTask: Task = {
      id: String(Date.now()),
      title: data.title,
      description: data.description,
      priority: data.priority,
      site: data.site,
      assignee: data.assignee,
      dueDate: data.dueDate,
      image: imageBase64,
      dataAihint: data.dataAihint,
      status: 'todo', 
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast({ title: "Task Added", description: `"${data.title}" has been added to To Do.` });
    form.reset();
    setIsModalOpen(false);
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(currentTasks => currentTasks.filter(t => t.id !== taskId));
    toast({ title: "Task Deleted", description: "The task has been removed.", variant: "destructive" });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Site Task Management</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-card rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Task</DialogTitle>
              <DialogDescription className="text-muted-foreground">Fill in the details for the new task.</DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmitTask)} className="space-y-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-foreground/90">Title</Label>
                <Input id="title" {...form.register("title")} placeholder="e.g., Foundation Pouring - Block A" className="bg-input border-border shadow-sm rounded-md focus:ring-primary" />
                {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="description" className="text-foreground/90">Description</Label>
                <Textarea id="description" {...form.register("description")} placeholder="Detailed description of the task..." className="bg-input border-border shadow-sm rounded-md min-h-[100px] focus:ring-primary" />
                {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="priority" className="text-foreground/90">Priority</Label>
                  <Select onValueChange={(value) => form.setValue("priority", value as 'low' | 'medium' | 'high')} defaultValue="medium">
                    <SelectTrigger id="priority" className="bg-input border-border shadow-sm rounded-md focus:ring-primary">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border shadow-lg rounded-md">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="site" className="text-foreground/90">Site</Label>
                  <Input id="site" {...form.register("site")} placeholder="e.g., Site Alpha" className="bg-input border-border shadow-sm rounded-md focus:ring-primary"/>
                  {form.formState.errors.site && <p className="text-sm text-destructive">{form.formState.errors.site.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                  <Label htmlFor="assignee" className="text-foreground/90">Assignee (Optional)</Label>
                  <Input id="assignee" {...form.register("assignee")} placeholder="e.g., John Doe" className="bg-input border-border shadow-sm rounded-md focus:ring-primary"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dueDate" className="text-foreground/90">Due Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal bg-input border-border shadow-sm rounded-md hover:bg-accent/10 focus:ring-primary ${!form.watch("dueDate") && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("dueDate") ? format(form.watch("dueDate")!, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border shadow-lg rounded-md" align="start">
                      <Calendar
                        mode="single"
                        selected={form.watch("dueDate")}
                        onSelect={(date) => form.setValue("dueDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="imageFile" className="text-foreground/90">Upload Image (Optional)</Label>
                <Input 
                    id="imageFile" 
                    type="file" 
                    accept="image/*" 
                    className="bg-input border-border shadow-sm rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:ring-primary"
                    onChange={(e) => handleImageUpload(e, (file) => form.setValue("imageFile", file))}
                />
                 {form.formState.errors.imageFile && <p className="text-sm text-destructive">{form.formState.errors.imageFile.message}</p>}
              </div>
               <div className="space-y-1">
                <Label htmlFor="dataAihint" className="text-foreground/90">AI Hint for Image (Optional)</Label>
                <Input id="dataAihint" {...form.register("dataAihint")} placeholder="e.g., foundation rebar" className="bg-input border-border shadow-sm rounded-md focus:ring-primary"/>
                 {form.formState.errors.dataAihint && <p className="text-sm text-destructive">{form.formState.errors.dataAihint.message}</p>}
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                    <Button type="button" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow">Add Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg rounded-lg">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search tasks (title, description, assignee)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:flex-1 bg-card border-input shadow-sm rounded-md focus:ring-primary"
            />
            <div className="flex space-x-2">
              <Select value={siteFilter} onValueChange={setSiteFilter}>
                <SelectTrigger id="siteFilter" className="w-full md:w-[180px] bg-card border-input shadow-sm rounded-md focus:ring-primary">
                  <SelectValue placeholder="Filter by site" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border shadow-lg rounded-md">
                  <SelectItem value="all">All Sites</SelectItem>
                  {uniqueSites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger id="priorityFilter" className="w-full md:w-[180px] bg-card border-input shadow-sm rounded-md focus:ring-primary">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border shadow-lg rounded-md">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-start"> {/* Removed gap for seamless column borders */}
            {columns.map((column, columnIndex) => (
              <div 
                key={column.id} 
                className={`p-4 ${columnIndex < columns.length - 1 ? 'md:border-r md:border-border' : ''} ${columnIndex > 0 ? 'border-t md:border-t-0 border-border' : ''}`} 
              > {/* Add borders between columns */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {column.icon}
                    <h2 className="text-lg font-semibold text-foreground">{column.title}</h2>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">{column.tasks.length}</span>
                </div>
                <div className="space-y-4 min-h-[200px] max-h-[calc(100vh-20rem)] overflow-y-auto pr-2"> {/* Added max-height and overflow */}
                  {column.tasks.map((task) => (
                    <Card key={task.id} className="bg-card shadow-md hover:shadow-lg transition-shadow rounded-lg">
                      <CardHeader className="p-3 pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-md font-semibold text-foreground leading-tight">{task.title}</CardTitle>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border shadow-lg rounded-md">
                              <DropdownMenuItem className="hover:bg-accent/50">Edit Task</DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                    const newStatus = task.status === 'todo' ? 'inprogress' : task.status === 'inprogress' ? 'completed' : 'todo';
                                    setTasks(currentTasks => currentTasks.map(t => t.id === task.id ? {...t, status: newStatus} : t));
                                }}
                                className="hover:bg-accent/50"
                              >
                                Move to {task.status === 'todo' ? 'In Progress' : task.status === 'inprogress' ? 'Completed' : 'To Do'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                          {task.site} {task.dueDate && `| Due: ${format(new Date(task.dueDate), "dd MMM yy")}`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{task.description}</p>
                        {task.image && (
                           <div className="my-2 rounded-md overflow-hidden aspect-video border border-border shadow-inner">
                             <Image src={task.image} alt={task.title} width={300} height={200} className="w-full h-full object-cover" data-ai-hint={task.dataAihint || "task image"} />
                           </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                           <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          {task.assignee && 
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground" title={`Assigned to: ${task.assignee}`}>
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground ring-1 ring-border shadow-sm">{task.assignee.substring(0,1).toUpperCase()}</div>
                              <span>{task.assignee.split(' ')[0]}</span>
                            </div>
                          }
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
        </CardContent>
      </Card>
    </div>
  );
}
