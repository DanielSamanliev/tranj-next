import z from "zod";

export const QuestionSchema = z.object({
  documentId: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const QuestionsSchema = z.object({
  questions: z.array(QuestionSchema),
});

export type QuestionAnswerType = z.infer<typeof QuestionSchema>;
