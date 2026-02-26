import { gqlRequestStrapi } from "@/api/gqlRequestStrapi";
import Loader from "@/components/Loader";
import FilterAndSort from "@/components/Products/FilterAndSort";
import Products from "@/components/Products/Products";
import { GET_CATEGORIES } from "@/queries/categories";
import { GET_PRODUCTS } from "@/queries/productsList";
import { CategoriesSchema } from "@/schemas/categories.schema";
import { ProductsListSchema } from "@/schemas/productsList.schema";
import { loadSearchparams } from "@/searchParams";
import { setRequestLocale } from "next-intl/server";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";

export async function getCategories(locale: string) {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  const result = await gqlRequestStrapi(
    GET_CATEGORIES,
    { locale },
    CategoriesSchema,
  );
  return result;
}

async function getProducts(
  locale: string,
  page: number,
  categories: string[],
  sort?: string | null,
) {
  "use cache";
  cacheLife("hours");
  cacheTag(`products-${locale}-page-${page}`);

  const result = await gqlRequestStrapi(
    GET_PRODUCTS,
    {
      locale,
      page,
      filters:
        categories && categories.length > 0
          ? { category: { title: { in: categories } } }
          : undefined,
      sort: sort ?? undefined,
    },
    ProductsListSchema,
  );
  return result;
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const productParams = loadSearchparams(searchParams);

  const products = getProducts(
    locale,
    1,
    productParams.categories,
    productParams.sort,
  );
  const categories = getCategories(locale);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <FilterAndSort categoriesPromise={categories} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Products productsPromise={products} />
      </Suspense>
    </>
  );
}
