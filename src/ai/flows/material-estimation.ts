
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
    .describe('Bill of Quantities (BOQ) items, including descriptions, units, and quantities. For example: "RCC M25: 100 cubic meters; Brickwork 230mm: 500 sq meters; Plastering 12mm: 1000 sq meters"'),
  siteParameters:
    z.string().describe('Site parameters such as area, dimensions, soil type, number of floors, specific conditions (e.g., high wastage zone), or purchase constraints (e.g., minimum order quantities for certain items). For example: "Total plot area: 5000 sq ft; Built-up area: 3000 sq ft per floor; Number of floors: G+2; Soil type: Black cotton; Consider 10% extra for brick wastage."'),
});
export type MaterialEstimationInput = z.infer<typeof MaterialEstimationInputSchema>;

const MaterialEstimationOutputSchema = z.object({
  materialEstimations: z.string().describe('Estimated material quantities with rationale, and suggested purchase quantities. Formatted clearly, e.g., using Markdown for sections per BOQ item.'),
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
  prompt: `You are an expert construction material estimator. Your goal is to provide clear, actionable material estimations based on the provided Bill of Quantities (BOQ) items and site parameters.

For each BOQ item, please provide:
1.  **Estimated Quantity**: The calculated quantity of material needed for the work item itself.
2.  **Suggested Purchase Quantity**: A practical quantity to purchase. This should consider factors like:
    *   Standard wastage percentages for the material type (e.g., bricks, tiles, cement).
    *   Potential buffer stock for contingencies.
    *   Typical supplier units or minimum order quantities if this can be inferred or is common knowledge (e.g., cement bags, full lengths of steel).
    *   Any specific site parameters provided by the user that might affect purchase quantities (e.g., user-specified wastage, storage limitations).
3.  **Rationale**: A clear explanation for both the estimated quantity and the suggested purchase quantity, detailing any assumptions made (e.g., wastage percentage used).

Structure your response clearly using Markdown. For each BOQ item, use the following format:

**Item: [Name/Description of BOQ Item from input]**
  - Estimated Quantity: [Calculated Quantity] [Unit] (e.g., 105 cubic meters)
  - Suggested Purchase Quantity: [Purchase Quantity] [Unit] (e.g., 110 cubic meters, or 220 bags of cement if applicable)
  - Rationale: [Your detailed explanation for the estimation and purchase suggestion, including any wastage factors or buffer considerations.]

--- (Separator for the next item) ---

Here are the project details:

Bill of Quantities (BOQ) Items:
{{{boqItems}}}

Site Parameters:
{{{siteParameters}}}

Begin your detailed material estimations below:
`,
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
