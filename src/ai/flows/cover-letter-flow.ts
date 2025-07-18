'use server';
/**
 * @fileOverview Generates a cover letter introduction.
 *
 * - generateCoverLetter - A function that generates a personalized cover letter intro.
 * - CoverLetterInput - The input type for the generateCoverLetter function.
 * - CoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoverLetterInputSchema = z.object({
  companyName: z.string().describe('The name of the company the user is applying to.'),
  role: z.string().describe('The role the user is applying for.'),
});
export type CoverLetterInput = z.infer<typeof CoverLetterInputSchema>;

const CoverLetterOutputSchema = z.object({
  coverLetterIntro: z.string().describe('A compelling, personalized cover letter introduction.'),
});
export type CoverLetterOutput = z.infer<typeof CoverLetterOutputSchema>;

export async function generateCoverLetter(input: CoverLetterInput): Promise<CoverLetterOutput> {
  return coverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coverLetterPrompt',
  input: {schema: CoverLetterInputSchema},
  output: {schema: CoverLetterOutputSchema},
  prompt: `You are a helpful career assistant for a developer named Kishan Sondagar.
  
  Your task is to generate a short, compelling, and personalized cover letter introduction based on the company name and role provided.

  Here are Kishan's key skills: HTML, CSS, JavaScript, Python, Next.js.
  Here are some of his personality traits: Passionate, elegant, efficient, creative.

  Generate a 2-3 sentence introduction for a cover letter to {{companyName}} for the {{role}} position. The tone should be professional but enthusiastic. Highlight one or two relevant skills or traits.`,
  model: 'googleai/gemini-2.0-flash',
});

const coverLetterFlow = ai.defineFlow(
  {
    name: 'coverLetterFlow',
    inputSchema: CoverLetterInputSchema,
    outputSchema: CoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
