import Loader from "@/components/Loader";
import { Map } from "@/components/Map";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contacts" });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tranj.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Tranj - Contact Us",
    url: `${baseUrl}/${locale === "bg" ? "контакти" : "en/contacts"}`,
    mainEntity: {
      "@type": "Butcher",
      "@id": `${baseUrl}/#business`,
    },
  };

  return (
    <main className="flex-1 py-20 px-4 @container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="@lg:max-w-lg mx-auto">
        <h1 className="font-[Playfair] text-foreground text-4xl md:text-5xl font-bold text-center mb-4">
          {t("title")}
        </h1>
        <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow-md border">
              <h2 className="font-[Playfair] text-3xl font-bold mb-6 text-foreground">
                {t("infoSectionTitle")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {t("phone")}
                    </h3>
                    <a className="text-foreground" href="tel:052511591">
                      (052) 511 591
                    </a>
                    <p className="text-sm text-foreground">
                      {t("mondayFriday")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {t("email")}
                    </h3>
                    <a
                      className="text-foreground block"
                      href="mailto:tranj@abv.bg"
                    >
                      tranj@abv.bg
                    </a>
                    <a
                      className="text-foreground"
                      href="mailto:tranj.office@gmail.com"
                    >
                      tranj.office@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {t("location")}
                    </h3>
                    <p className="text-foreground">{t("addressValue")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">
                      {t("openingHours")}
                    </h3>
                    <div className="space-y-1 text-foreground">
                      <p>{t("mondayFriday")}</p>
                      <p>{t("saturday")}</p>
                      <p>{t("sunday")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
              <div className="font-semibold mb-2 text-foreground">
                {t("specialOrders")}
              </div>
              <p className="text-sm text-foreground">
                {t("specialOrdersDescription")}
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-[400px] flex justify-center items-center w-full">
                <Loader />
              </div>
            }
          >
            <Map t={t} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
