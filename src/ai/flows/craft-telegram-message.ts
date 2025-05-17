// src/ai/flows/craft-telegram-message.ts
'use server';
/**
 * @fileOverview A flow that crafts compelling messages for Telegram, especially for finance-related topics.
 *
 * - craftTelegramMessage - A function that generates message drafts based on user input.
 * - CraftTelegramMessageInput - The input type for the craftTelegramMessage function.
 * - CraftTelegramMessageOutput - The return type for the craftTelegramMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CraftTelegramMessageInputSchema = z.object({
  goal: z.string().describe('A brief description of the message\'s goal or topic.'),
  keyPoints: z
    .string()
    .optional()
    .describe('Key points, data, or links to include in the message.'),
  tone: z
    .string()
    .optional()
    .describe('The desired tone or style for the message (e.g., professional, urgent).'),
  topic: z
    .string()
    .optional()
    .describe(
      'The topic of the message (e.g., stock market, cryptocurrency, general investment).'
    ),
  audience: z
    .string()
    .optional()
    .describe('The target audience profile if it influences the language.'),
});

export type CraftTelegramMessageInput = z.infer<typeof CraftTelegramMessageInputSchema>;

const CraftTelegramMessageOutputSchema = z.object({
  draftMessages: z.array(z.string()).describe('Generated draft messages based on user input.'),
});

export type CraftTelegramMessageOutput = z.infer<typeof CraftTelegramMessageOutputSchema>;

export async function craftTelegramMessage(
  input: CraftTelegramMessageInput
): Promise<CraftTelegramMessageOutput> {
  return craftTelegramMessageFlow(input);
}

const craftTelegramMessagePrompt = ai.definePrompt({
  name: 'craftTelegramMessagePrompt',
  input: {schema: CraftTelegramMessageInputSchema},
  output: {schema: CraftTelegramMessageOutputSchema},
  prompt: `You are an AI assistant specialized in crafting compelling messages for Telegram, especially for finance-related topics like stock market and cryptocurrency discussions. Generate 1-3 well-structured and engaging draft messages based on the user's input.

User Input:
Goal: {{{goal}}}
Key Points: {{{keyPoints}}}
Tone: {{{tone}}}
Topic: {{{topic}}}
Audience: {{{audience}}}

Instructions:
- Tailor the messages to the specified domain (especially finance when indicated).
- Focus on clarity, conciseness (suitable for Telegram), and engagement.
- AVOID giving direct, unsolicited financial advice. Focus on helping the user articulate information or opinions they provide.
- Do not generate speculative price predictions unless explicitly asked to frame such a statement based on user-provided speculation.
- The messages should be ready to be copied to a message composer, so make them suitable for direct use.
- The output should be an array of strings. Do not return a numbered list, or use any leading characters to indicate the message, just the message content itself.

Output:
{{#each draftMessages}}{{{this}}}{{#unless @last}}
{{/unless}}{{/each}}`,
});

const craftTelegramMessageFlow = ai.defineFlow(
  {
    name: 'craftTelegramMessageFlow',
    inputSchema: CraftTelegramMessageInputSchema,
    outputSchema: CraftTelegramMessageOutputSchema,
  },
  async input => {
    const {output} = await craftTelegramMessagePrompt({
      ...input,
      draftMessages: [],
    });

    return {
      draftMessages: output?.draftMessages ?? [],
    };
  }
);
