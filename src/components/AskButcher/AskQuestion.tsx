"use client";

import { Button, Input, Textarea } from "@heroui/react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AskQuestion() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const t = useTranslations("askButcher");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Question:", question);
    // Reset form fields
    setEmail("");
    setQuestion("");
  };

  return (
    <div className="max-w-[670px] mx-auto mb-16 border-gray-200 rounded-md border bg-card text-card-foreground shadow-sm">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {t("submitTitle")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="email"
              value={email}
              radius="none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="mt-1"
              label={t("emailLabel")}
              labelPlacement="outside-top"
            />
          </div>
          <div>
            <Textarea
              id="question"
              value={question}
              radius="none"
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t("questionPlaceholder")}
              minRows={4}
              className="mt-1"
              label={t("questionLabel")}
              labelPlacement="outside-top"
            />
          </div>
          <Button
            radius="none"
            type="submit"
            color="primary"
            disabled={!email || !question}
            className="w-full gap-2"
          >
            <Send className="h-4 w-4" />
            {t("submitButton")}
          </Button>
        </form>
      </div>
    </div>
  );
}
