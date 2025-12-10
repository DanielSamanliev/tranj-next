import { QuestionAnswerType } from "@/schemas/questions.schema";

interface Props {
  questionAnswer: QuestionAnswerType;
}

export default function QuestionAnswer({ questionAnswer }: Props) {
  return (
    <div className="rounded-sm border bg-card text-card-foreground shadow-sm h-full border-border">
      <div className="p-6 flex flex-col h-full">
        <h3 className="font-semibold text-lg text-foreground mb-3">
          "{questionAnswer.question}"
        </h3>
        <p className="text-muted-foreground text-sm grow">
          {questionAnswer.answer}
        </p>
      </div>
    </div>
  );
}
