import { gqlRequestStrapi } from "@/api/gqlRequestStrapi";
import Back from "@/components/ProductPage/Back";
import { GET_PRODUCT_BY_SLUG } from "@/queries/product";
import { ProductQuerySchema } from "@/schemas/product.schema";
import { bgnToEur } from "@/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(locale: string, slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${locale}-${slug}`);

  const result = await gqlRequestStrapi(
    GET_PRODUCT_BY_SLUG,
    { locale, slug },
    ProductQuerySchema,
  );

  if (result.products.length === 0) {
    return null;
  }

  return result.products[0];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const decodedSlug = decodeURI(slug);

  const product = await getProduct(locale, decodedSlug);

  if (!product) {
    notFound();
  }

  const tCommon = await getTranslations("common");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tranj.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description ?? product.longDescription ?? undefined,
    image: product.image.url,
    url: `${baseUrl}/${locale === "bg" ? "продукт" : "product"}/${decodedSlug}`,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Butcher",
        "@id": `${baseUrl}/#business`,
        name: "Tranj",
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.price.toFixed(2),
        priceCurrency: "EUR",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "KGM",
        },
      },
    },
  };

  return (
    <main className="flex-1 py-12 px-4 bg-background @container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto @lg:max-w-lg">
        <Back />

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="relative aspect-square overflow-hidden rounded-lg border-2">
            <Image
              src={product.image.url}
              alt={product.title || "Product Image"}
              height={652}
              width={652}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-[Playfair] text-4xl md:text-5xl font-black text-foreground mb-4">
              {product.title}
            </h1>
            <h2 className="font-inter text-xl text-muted-foreground mb-6">
              {product.description}
            </h2>
            <h3 className="font-inter text-foreground mb-8 leading-relaxed">
              {product.longDescription}
            </h3>

            <div className="flex items-center gap-6 mb-8">
              <span className="font-[Playfair] text-5xl font-bold text-accent">
                <p>
                  {product.price.toFixed(2)} {tCommon("bgn")} /{tCommon("kg")}
                </p>
                {bgnToEur(product.price).toFixed(2)} € /{tCommon("kg")}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="font-playfair text-3xl font-bold text-foreground mb-6">
            {tCommon("prepMethods")}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {product.prepMethods?.map((method) => (
              <div
                key={method.title}
                className="border border-gray-300 rounded-sm bg-card text-card-foreground shadow-sm"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <img src={method.icon.url} alt={method.title} />
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl text-center font-bold text-foreground mb-2">
                    {method.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
