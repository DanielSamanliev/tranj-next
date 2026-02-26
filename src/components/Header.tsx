import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitch } from "./LocaleSwitch";
import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Menu } from "lucide-react";

export const Header = () => {
  const t = useTranslations("nav");

  return (
    <nav className="bg-primary text-primary-foreground py-0.5 @container sticky top-0 z-50 shadow-md">
      <div className=" not-lg:px-4 lg:max-w-2/3 mx-auto flex items-center justify-between @lg:max-w-lg">
        <Suspense>
          <Link
            href="/"
            className="text-4xl font-bold font-[Playfair] cursor-pointer hover:text-secondary relative lg:w-[140px] lg:h-[95px] w-[120px] h-20 flex items-center justify-center"
          >
            <Image
              src="/images/logo-tranj.svg"
              alt={t("title")}
              width={150}
              height={100}
            />
          </Link>

          <div className="flex gap-1 md:gap-8 font-medium text-xl items-center">
            <div className="md:flex gap-8 hidden">
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
            </div>

            <LocaleSwitch />

            <Button variant="ghost" isIconOnly className="md:hidden">
              <Menu className="h-6 w-6 text-primary-foreground" />
            </Button>
          </div>
        </Suspense>

        {/* <Button variant="ghost" isIconOnly className="md:hidden">
          <Menu className="h-6 w-6 text-primary-foreground" />
        </Button> */}
      </div>
    </nav>
  );
};
