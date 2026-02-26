import type { MetadataRoute } from "next";
import { gqlRequestStrapi } from "@/api/gqlRequestStrapi";
import { routing } from "@/i18n/routing";
import { GET_PRODUCT_SLUGS } from "@/queries/productSlugs";
import { ProductSlugsSchema } from "@/schemas/productSlugs.schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pathnames = routing.pathnames;

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          bg: `${BASE_URL}/`,
        },
      },
    },
    {
      url: `${BASE_URL}${pathnames["/products"].bg}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${pathnames["/products"].en}`,
          bg: `${BASE_URL}${pathnames["/products"].bg}`,
        },
      },
    },
    {
      url: `${BASE_URL}${pathnames["/about"].bg}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${pathnames["/about"].en}`,
          bg: `${BASE_URL}${pathnames["/about"].bg}`,
        },
      },
    },
    {
      url: `${BASE_URL}${pathnames["/contacts"].bg}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${pathnames["/contacts"].en}`,
          bg: `${BASE_URL}${pathnames["/contacts"].bg}`,
        },
      },
    },
    {
      url: `${BASE_URL}${pathnames["/ask-the-butcher"].bg}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${pathnames["/ask-the-butcher"].en}`,
          bg: `${BASE_URL}${pathnames["/ask-the-butcher"].bg}`,
        },
      },
    },
  ];

  const [productsBg, productsEn] = await Promise.all([
    gqlRequestStrapi(GET_PRODUCT_SLUGS, { locale: "bg" }, ProductSlugsSchema),
    gqlRequestStrapi(GET_PRODUCT_SLUGS, { locale: "en" }, ProductSlugsSchema),
  ]);

  const productEntries: MetadataRoute.Sitemap = productsBg.products.map(
    (product) => {
      const enSlug =
        productsEn.products.find((p) => p.slug === product.slug)?.slug ??
        product.slug;

      const bgPath = pathnames["/product/[slug]"].bg.replace(
        "[slug]",
        product.slug,
      );
      const enPath = pathnames["/product/[slug]"].en.replace("[slug]", enSlug);

      return {
        url: `${BASE_URL}${bgPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${enPath}`,
            bg: `${BASE_URL}${bgPath}`,
          },
        },
      };
    },
  );

  return [...staticEntries, ...productEntries];
}
