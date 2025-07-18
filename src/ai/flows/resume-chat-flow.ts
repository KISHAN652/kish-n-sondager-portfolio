'use server';
/**
 * @fileOverview An AI agent that can answer questions about Kishan Sondagar's resume.
 *
 * - chatAboutResume - A function that handles the chat interaction.
 * - ResumeChatInput - The input type for the chatAboutResume function.
 * - ResumeChatOutput - The return type for the chatAboutResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResumeChatInputSchema = z.object({
  question: z.string().describe('The user\'s question about the resume.'),
});
export type ResumeChatInput = z.infer<typeof ResumeChatInputSchema>;

const ResumeChatOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question.'),
});
export type ResumeChatOutput = z.infer<typeof ResumeChatOutputSchema>;

export async function chatAboutResume(input: ResumeChatInput): Promise<ResumeChatOutput> {
  return resumeChatFlow(input);
}

const resumeContext = `
You are a friendly and professional AI assistant for a developer named Kishan Sondagar. Your goal is to answer questions about Kishan's resume, skills, projects, and education based on the information provided below. Keep your answers concise and helpful.

**Kishan's Resume Details:**

*   **Name:** Kishan Sondagar
*   **Role:** Passionate developer specializing in creating elegant and efficient web solutions.

*   **Skills:**
    *   HTML: 95% proficiency
    *   CSS: 90% proficiency
    *   JavaScript: 85% proficiency
    *   Python: 80% proficiency

*   **Projects:**
    1.  **Portfolio Website:** A personal portfolio to showcase skills and projects. Built with Next.js, Tailwind CSS, and TypeScript, featuring a clean, responsive design and AI-powered dynamic greetings.
    2.  **E-commerce Platform:** A full-stack e-commerce site with features like product catalog, shopping cart, user authentication, and a checkout process. The backend is powered by Python.
    3.  **Task Management App:** A simple and intuitive task management application to help users organize their daily tasks. Features include creating, editing, deleting, and marking tasks as complete.

*   **Education:**
    *   **Degree:** Bachelor of Engineering
    *   **Graduation:** May 2025
    *   **CGPA:** 7.04
`;

const prompt = ai.definePrompt({
  name: 'resumeChatPrompt',
  input: { schema: ResumeChatInputSchema },
  output: { schema: ResumeChatOutputSchema },
  system: resumeContext,
  prompt: `A visitor is asking the following question: "{{question}}". Please provide a helpful answer based on the resume details.`,
  model: 'googleai/gemini-2.0-flash',
});

const resumeChatFlow = ai.defineFlow(
  {
    name: 'resumeChatFlow',
    inputSchema: ResumeChatInputSchema,
    outputSchema: ResumeChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
