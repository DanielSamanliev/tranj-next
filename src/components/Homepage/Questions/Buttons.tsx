import { Link } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function QuestionButtons() {
  const t = useTranslations("askButcher");

  return (
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <Button
        as={Link}
        href="/ask-the-butcher#questions"
        color="primary"
        variant="light"
        radius="none"
        className="gap-2"
      >
        {t("viewAnswers")}
      </Button>

      <Button
        as={Link}
        href="/ask-the-butcher"
        color="primary"
        radius="none"
        className="gap-2"
      >
        {t("askNow")}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
