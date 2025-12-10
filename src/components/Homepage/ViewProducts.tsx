"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

export default function ViewProducts() {
  const t = useTranslations("hero");

  return (
    <Button
      as={Link}
      href="/products"
      variant="solid"
      size="lg"
      className="rounded-xs bg-secondary text-primary-foreground hover:scale-105 font-semibold text-2xl px-8 py-4 transition-transform"
    >
      <span className="backface-hidden">{t("viewProducts")}</span>
    </Button>
  );
}
