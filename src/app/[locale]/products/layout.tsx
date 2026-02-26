import Loader from "@/components/Loader";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function ProductsLayout({
  children,
  params,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <main className="bg-background @container">
      <div className="py-12 @lg:max-w-lg not-md:px-4 mx-auto">
        <h1 className="font-[Playfair] text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          {t("title")}
        </h1>
        <h2 className="text-lg text-muted-foreground max-w-2xl text-center mx-auto mb-10">
          {t("subtitle")}
        </h2>

        <Suspense fallback={<Loader />}>{children}</Suspense>
      </div>
    </main>
  );
}
