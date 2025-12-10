import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitch } from "./LocaleSwitch";
import { Suspense } from "react";
import Image from "next/image";

export const Header = () => {
  const t = useTranslations("nav");

  return (
    <nav className="bg-primary text-primary-foreground py-2 @container sticky top-0 z-50 shadow-md">
      <div className="max-w-2/3 mx-auto flex items-center justify-between @lg:max-w-lg">
        <Suspense>
          <Link
            href="/"
            className="text-4xl font-bold font-[Playfair] cursor-pointer hover:text-secondary"
          >
            <Image
              src="/images/logo-tranj.svg"
              alt={t("title")}
              width={150}
              height={100}
            />
          </Link>

          <div className="hidden md:flex gap-8 font-medium text-xl items-center">
            <Link href="/" className="hover:text-secondary transition-colors">
              {t("home")}
            </Link>
            <Link
              href="/products"
              className="hover:text-secondary transition-colors"
            >
              {t("products")}
            </Link>
            <Link
              href="/about"
              className="hover:text-secondary transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/contacts"
              className="hover:text-secondary transition-colors"
            >
              {t("contacts")}
            </Link>

            <LocaleSwitch />
          </div>
        </Suspense>

        {/* <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
      </Button> */}
      </div>
    </nav>
  );
};
