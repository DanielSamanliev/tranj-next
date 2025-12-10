import { gqlRequestStrapi } from "@/api/gqlRequestStrapi";
import AboutUs from "@/components/Homepage/AboutUs";
import { FeaturedSelection } from "@/components/Homepage/Featured/FeaturedSelection";
import { Hero } from "@/components/Homepage/Hero";
import { routing } from "@/i18n/routing";
import { GET_HOMEPAGE_ITEMS } from "@/queries/homePageItems";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cacheLife, cacheTag } from "next/cache";
import { getCategories } from "./products/page";
import Categories from "@/components/Homepage/Categories/Categories";
import { HomepageSchema } from "@/schemas/homepage.schema";
import QuestionsSection from "@/components/Homepage/Questions/QuestionsSection";
import { Suspense } from "react";

async function getItems(locale: string) {
  "use cache";
  cacheLife("days");
  cacheTag("featured");

  const res = await gqlRequestStrapi(
    GET_HOMEPAGE_ITEMS,
    { locale },
    HomepageSchema
  );
  return res;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metaData.home" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = await getItems(locale);
  const categories = await getCategories(locale);

  return (
    <div className="min-h-screen gap-16 @conatiner">
      <Hero />

      <Categories categories={categories.categories} />

      <FeaturedSelection featuredProducts={items.products} />

      <AboutUs />

      <Suspense>
        <QuestionsSection questions={items.questions} />
      </Suspense>
    </div>
  );
}
