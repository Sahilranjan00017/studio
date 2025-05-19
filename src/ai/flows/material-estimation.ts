// MaterialEstimationAI.ts
'use server';

/**
 * @fileOverview AI tool for estimating material quantities based on BOQ items and site parameters.
 *
 * - estimateMaterialQuantities - A function that handles the material estimation process.
 * - MaterialEstimationInput - The input type for the estimateMaterialQuantities function.
 * - MaterialEstimationOutput - The return type for the estimateMaterialQuantities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaterialEstimationInputSchema = z.object({
  boqItems: z
    .string()
    .describe('Bill of Quantities (BOQ) items, including descriptions and units.'),
  siteParameters:
    z.string().describe('Site parameters such as area, dimensions, and other relevant details.'),
});
export type MaterialEstimationInput = z.infer<typeof MaterialEstimationInputSchema>;

const MaterialEstimationOutputSchema = z.object({
  materialEstimations: z.string().describe('Estimated material quantities with rationale.'),
});
export type MaterialEstimationOutput = z.infer<typeof MaterialEstimationOutputSchema>;

export async function estimateMaterialQuantities(
  input: MaterialEstimationInput
): Promise<MaterialEstimationOutput> {
  return materialEstimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'materialEstimationPrompt',
  input: {schema: MaterialEstimationInputSchema},
  output: {schema: MaterialEstimationOutputSchema},
  prompt: `You are an expert construction material estimator. Based on the provided Bill of Quantities (BOQ) items and site parameters, estimate the optimal material quantities required for the project. Provide a rationale for each estimation.

BOQ Items: {{{boqItems}}}
Site Parameters: {{{siteParameters}}}

Material Estimations:`,
});

const materialEstimationFlow = ai.defineFlow(
  {
    name: 'materialEstimationFlow',
    inputSchema: MaterialEstimationInputSchema,
    outputSchema: MaterialEstimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
