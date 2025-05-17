// src/app/(app)/scheduler/actions.ts
"use server";

import { craftTelegramMessage, type CraftTelegramMessageInput, type CraftTelegramMessageOutput } from "@/ai/flows/craft-telegram-message";

export async function craftTelegramMessageAction(
  input: CraftTelegramMessageInput
): Promise<CraftTelegramMessageOutput | { error: string }> {
  try {
    const result = await craftTelegramMessage(input);
    return result;
  } catch (error: any) {
    console.error("Error in craftTelegramMessageAction:", error);
    return { error: error.message || "An unexpected error occurred while crafting the message." };
  }
}
