"use client";

import { Link, usePathname } from "@/i18n/navigation";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export const LocaleSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const productSlug = (params?.name as string) || "";

  return (
    <div className="flex items-center pl-4">
      <Link
        href={{ pathname, params: { slug: productSlug } }}
        aria-disabled={locale === "bg"}
        locale={"bg"}
        className={clsx(
          "text-lg px-1.5 py-0.5 hover:text-secondary transition-colors",
          { "underline font-semibold": locale === "bg" }
        )}
      >
        БГ
      </Link>
      <hr className="border-r h-6" />
      <Link
        href={{ pathname, params: { slug: productSlug } }}
        locale={"en"}
        aria-disabled={locale === "en"}
        className={clsx(
          "text-lg px-1.5 py-0.5 hover:text-secondary transition-colors",
          { "underline font-semibold": locale === "en" }
        )}
      >
        EN
      </Link>
    </div>
  );
};
