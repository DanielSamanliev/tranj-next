import { Link } from "@/i18n/navigation";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

export const Footer = () => {
  const t = useTranslations("nav");

  return (
    <footer className="bg-primary text-primary-foreground py-12 mb-0 @container">
      <div className="mx-auto max-w-lg">
        <div className="flex not-md:flex-col not-md:px-6 justify-between md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">
              {t("quickLinks")}
            </h4>
            <Suspense>
              <nav className="flex flex-col gap-2 font-inter text-sm w-fit">
                <Link
                  href="/"
                  className="hover:text-secondary transition-colors"
                >
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
              </nav>
            </Suspense>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">
              {t("contacts")}
            </h4>
            <div className="flex flex-col gap-3 font-inter text-sm">
              <div className="flex items-center gap-2 hover:text-secondary">
                <Phone className="h-4 w-4" />
                <a href="tel:052511591">(052) 511 591</a>
              </div>
              <div className="flex items-center gap-2 hover:text-secondary">
                <Mail className="h-4 w-4" />
                <a href="mailto:tranj@abv.bg">tranj@abv.bg</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{t("address")}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-inter font-semibold text-lg mb-4">
              {t("follow")}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/tranjvarna1992"
                target="_blank"
                title="Facebook"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="font-inter text-sm text-primary-foreground/70">
            © 2025 Butcher Tranj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
