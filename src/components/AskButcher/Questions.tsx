import { QuestionAnswerType } from "@/schemas/questions.schema";

interface Props {
  questions: QuestionAnswerType[];
}

export default function Questions({ questions }: Props) {
  return (
    <div id="questions">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
        Previously Asked Questions
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {questions.map((question) => (
          <div
            key={question.documentId}
            className="border-gray-100 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <h3 className="font-semibold text-lg text-foreground mb-3">
                "{question.question}"
              </h3>
              <p className="text-muted-foreground">{question.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
