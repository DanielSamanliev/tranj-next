"use client";

import Carousel from "@/components/Carousel/Carousel";
import { MessageCircleQuestion } from "lucide-react";
import QuestionAnswer from "./QuestionAnswer";
import { useTranslations } from "next-intl";
import QuestionButtons from "./Buttons";
import { HomepageType } from "@/schemas/homepage.schema";
import { use } from "react";

interface Props {
  questionsPromise: Promise<HomepageType>;
}

export default function QuestionsSection({ questionsPromise }: Props) {
  const { questions } = use(questionsPromise);
  const t = useTranslations("askButcher");

  return (
    <section className="py-20 bg-muted/30 @container">
      <div className="@lg:max-w-lg mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircleQuestion className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto lg:px-12">
          <Carousel
            slides={questions.map((qa) => ({
              id: qa.documentId,
              content: (
                <QuestionAnswer key={qa.documentId} questionAnswer={qa} />
              ),
            }))}
          />
        </div>

        <QuestionButtons />
      </div>
    </section>
  );
}
