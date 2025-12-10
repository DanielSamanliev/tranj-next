import { gqlRequestStrapi } from "@/api/gqlRequestStrapi";
import AskQuestion from "@/components/AskButcher/AskQuestion";
import Questions from "@/components/AskButcher/Questions";
import { GET_QUESTIONS } from "@/queries/questions";
import { QuestionsSchema } from "@/schemas/questions.schema";
import { MessageCircleQuestion } from "lucide-react";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";

async function getQuestions(locale: Locale) {
  "use cache";
  cacheLife("days");
  cacheTag("questions");

  const res = await gqlRequestStrapi(
    GET_QUESTIONS,
    { locale },
    QuestionsSchema
  );

  if (!res.questions) {
    return [];
  }

  return res.questions;
}

export default async function AskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("askButcher");

  const questions = await getQuestions(locale);

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircleQuestion className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {t("title")}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <AskQuestion />
        </Suspense>

        <Questions questions={questions} />
      </div>
    </main>
  );
}
