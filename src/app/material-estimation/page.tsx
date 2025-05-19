'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { estimateMaterialQuantities, type MaterialEstimationInput, type MaterialEstimationOutput } from '@/ai/flows/material-estimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  boqItems: z.string().min(10, { message: 'BOQ items must be at least 10 characters.' }).max(5000, { message: 'BOQ items must not exceed 5000 characters.' }),
  siteParameters: z.string().min(10, { message: 'Site parameters must be at least 10 characters.' }).max(5000, { message: 'Site parameters must not exceed 5000 characters.' }),
});

type MaterialEstimationFormValues = z.infer<typeof formSchema>;

export default function MaterialEstimationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [estimationResult, setEstimationResult] = useState<MaterialEstimationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<MaterialEstimationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boqItems: '',
      siteParameters: '',
    },
  });

  const onSubmit: SubmitHandler<MaterialEstimationFormValues> = async (data) => {
    setIsLoading(true);
    setEstimationResult(null);
    try {
      const result = await estimateMaterialQuantities(data);
      setEstimationResult(result);
      toast({
        title: "Estimation Successful",
        description: "Material quantities have been estimated.",
      });
    } catch (error) {
      console.error('Error estimating materials:', error);
      toast({
        title: "Estimation Failed",
        description: "Could not estimate material quantities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Material Estimation AI</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Input Project Details</CardTitle>
            <CardDescription>
              Provide the Bill of Quantities (BOQ) items and site parameters to get AI-powered material estimations.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="boqItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Bill of Quantities (BOQ) Items</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., RCC M25 - 100 cubic meters, Brickwork 230mm - 500 sq meters, Plastering 12mm - 1000 sq meters..."
                          className="min-h-[150px] bg-card border-input text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter detailed BOQ items, including descriptions, units, and quantities.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="siteParameters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Site Parameters</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., Total plot area: 5000 sq ft, Built-up area: 3000 sq ft per floor, Number of floors: G+2, Soil type: Black cotton..."
                          className="min-h-[150px] bg-card border-input text-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe relevant site conditions, dimensions, and project scope.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Estimate Materials
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">AI Estimation Results</CardTitle>
            <CardDescription>
              Estimated material quantities and rationale will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Estimating materials, please wait...</p>
              </div>
            )}
            {!isLoading && estimationResult && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">Estimated Quantities:</h3>
                <div className="p-4 bg-muted/50 rounded-md border border-border whitespace-pre-wrap text-sm text-foreground">
                  {estimationResult.materialEstimations}
                </div>
              </div>
            )}
            {!isLoading && !estimationResult && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Results will be displayed once you submit the details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
