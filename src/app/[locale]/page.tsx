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
import Loader from "@/components/Loader";

async function getItems(locale: string) {
  "use cache";
  cacheLife("days");
  cacheTag("featured");

  const res = await gqlRequestStrapi(
    GET_HOMEPAGE_ITEMS,
    { locale },
    HomepageSchema,
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
  const items = getItems(locale);
  const categories = getCategories(locale);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tranj.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Butcher",
    "@id": `${baseUrl}/#business`,
    name: "Tranj",
    url: baseUrl,
    description:
      locale === "bg"
        ? "Открийте най-добрата селекция от месо в Трънж."
        : "Discover the finest selection of meats at Tranj.",
    telephone: "+35952511591",
    email: ["tranj@abv.bg", "tranj.office@gmail.com"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Troleyna 12",
      addressLocality: "Varna",
      postalCode: "9009",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.227206050785924,
      longitude: 27.894862278622313,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    image: `${baseUrl}/images/logo-tranj.svg`,
    logo: `${baseUrl}/images/logo-tranj.svg`,
    priceRange: "$$",
    currenciesAccepted: "BGN",
    paymentAccepted: "Cash, Credit Card",
    areaServed: {
      "@type": "City",
      name: "Varna",
    },
    sameAs: ["https://www.facebook.com/tranjvarna1992/"],
  };

  return (
    <div className="min-h-screen gap-16 @conatiner">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />

      <Suspense
        fallback={
          <div className="w-full flex justify-center mx-auto py-36 bg-muted/30">
            <Loader />
          </div>
        }
      >
        <Categories categoriesPromise={categories} />
      </Suspense>

      <Suspense
        fallback={
          <div className="w-full flex justify-center mx-auto py-40 bg-background">
            <Loader />
          </div>
        }
      >
        <FeaturedSelection featuredProductsPromise={items} />
      </Suspense>

      <AboutUs />

      <Suspense
        fallback={
          <div className="bg-muted/30 w-full flex justify-center mx-auto py-40">
            <Loader />
          </div>
        }
      >
        <QuestionsSection questionsPromise={items} />
      </Suspense>
    </div>
  );
}
