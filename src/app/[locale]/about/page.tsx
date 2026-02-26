import { Award, Clock, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

const values = [
  {
    icon: Award,
    title: "qualityTitle",
    description: "quality",
  },
  {
    icon: Users,
    title: "communityTitle",
    description: "community",
  },
  {
    icon: Clock,
    title: "craftTitle",
    description: "craft",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl text-center container mx-auto px-4">
          <h1 className="font-[Playfair] text-5xl md:text-6xl font-bold mb-6">
            {t("title")}
          </h1>
          <p className="font-inter text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-background container mx-auto">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[Playfair] text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("legacy")}
            </h2>
            <div className="space-y-4 font-inter text-muted-foreground leading-relaxed">
              <p>{t("legacyDescriptionOne")}</p>
              <p>{t("legacyDescriptionTwo")}</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="font-[Playfair] text-4xl font-bold text-primary">
                  20+
                </p>
                <p className="font-inter text-sm text-muted-foreground mt-1">
                  {t("years")}
                </p>
              </div>
              <div>
                <p className="font-[Playfair] text-4xl font-bold text-primary">
                  30+
                </p>
                <p className="font-inter text-sm text-muted-foreground mt-1">
                  {t("products")}
                </p>
              </div>
              <div>
                <p className="font-[Playfair] text-4xl font-bold text-primary">
                  3
                </p>
                <p className="font-inter text-sm text-muted-foreground mt-1">
                  {t("gen")}
                </p>
              </div>
              <div>
                <p className="font-[Playfair] text-4xl font-bold text-primary">
                  50k+
                </p>
                <p className="font-inter text-sm text-muted-foreground mt-1">
                  {t("customers")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-5xl mx-auto container px-4">
          <h2 className="font-[Playfair] text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t("stand")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-[Playfair] text-xl font-bold text-foreground mb-2">
                  {t(v.title)}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                  {t(v.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
