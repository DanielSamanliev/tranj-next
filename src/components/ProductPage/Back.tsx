"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Back() {
  const t = useTranslations("products");
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/products");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      radius="none"
      className="mb-8 font-inter"
      onPress={handleBack}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {t("backToProducts")}
    </Button>
  );
}
