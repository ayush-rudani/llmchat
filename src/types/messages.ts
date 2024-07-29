import { TAssistant } from "./assistants";
import { TToolResponse } from "./tools";

export const stopReasons = [
  "error",
  "cancel",
  "apikey",
  "recursion",
  "finish",
] as const;

export type TStopReason = (typeof stopReasons)[number];

export type TLLMRunConfig = {
  context?: string;
  input?: string;
  image?: string;
  sessionId: string;
  messageId?: string;
  assistant: TAssistant;
};

export type TChatMessage = {
  id: string;
  image?: string;
  rawHuman?: string;
  rawAI?: string;
  sessionId: string;
  parentId: string;
  runConfig: TLLMRunConfig;
  tools?: TToolResponse[];
  isLoading?: boolean;
  stop?: boolean;
  stopReason?: TStopReason;
  createdAt: string;
  relatedQuestions?: string[];
};
