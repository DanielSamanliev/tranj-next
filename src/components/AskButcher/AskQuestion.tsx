"use client";

import { Button, Input, Textarea } from "@heroui/react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { createQuestion, QuestionActionState } from "@/app/lib/actions";

const initialState: QuestionActionState = { success: false, error: null };

export default function AskQuestion() {
  const [state, formAction, isPending] = useActionState(
    createQuestion,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  const t = useTranslations("askButcher");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="max-w-[670px] mx-auto mb-16 border-gray-200 rounded-md border bg-card text-card-foreground shadow-sm">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {t("submitTitle")}
        </h2>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div>
            <Input
              name="email"
              radius="none"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              className="mt-1"
              label={t("emailLabel")}
              labelPlacement="outside-top"
            />
          </div>
          <div>
            <Textarea
              name="question"
              radius="none"
              required
              placeholder={t("questionPlaceholder")}
              minRows={4}
              className="mt-1"
              label={t("questionLabel")}
              labelPlacement="outside-top"
            />
          </div>
          <Button
            fullWidth
            radius="none"
            type="submit"
            color="primary"
            isLoading={isPending}
            disabled={isPending}
            endContent={!isPending && <Send className="h-4 w-4" />}
          >
            {t("submitButton")}
          </Button>
          <div>
            {state.error && (
              <p className="text-sm text-red-500">
                {t.has(state.error) ? t(state.error) : t("errorMessage")}
              </p>
            )}
            {state.success && (
              <p className="text-sm text-green-500">{t("successMessage")}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
