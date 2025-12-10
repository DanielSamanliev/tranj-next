import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("aboutUs");

  return (
    <section className="py-20 px-4 bg-card-foreground h-full">
      <div className="text-center max-w-[896px] mx-auto">
        <h2 className="text-4xl font-[Playfair] md:text-5xl font-bold text-foreground mb-10">
          {t("title")}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {t("paragraph1")}
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t("paragraph2")}
        </p>
      </div>
    </section>
  );
}
