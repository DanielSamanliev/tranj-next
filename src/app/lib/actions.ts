"use server";

import { gqlRequestStrapi } from "@/api/gqlRequestStrapi";
import { CREATE_QUESTION } from "@/queries/createQuestion";
import z from "zod";

const QuestionOutputSchema = z.object({
  createQuestion: z.object({
    documentId: z.string(),
  }),
});

export type QuestionActionState = {
  success: boolean;
  error: string | null;
};

export async function createQuestion(
  _prevState: QuestionActionState,
  formData: FormData,
): Promise<QuestionActionState> {
  const email = formData.get("email");
  const question = formData.get("question");

  if (
    typeof email !== "string" ||
    typeof question !== "string" ||
    !email ||
    !question
  ) {
    return { success: false, error: "fillAllFields" };
  }

  try {
    const response = await gqlRequestStrapi(
      CREATE_QUESTION,
      { data: { email, question } },
      QuestionOutputSchema,
      process.env.NEXT_STRAPI_WRITE_TOKEN,
    );

    if (!response || !response.createQuestion.documentId) {
      return { success: false, error: "errorMessage" };
    }

    return { success: true, error: null };
  } catch (e) {
    console.error("createQuestion error:", e);
    return { success: false, error: "errorMessage" };
  }
}
