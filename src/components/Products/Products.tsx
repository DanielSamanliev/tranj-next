import { useTranslations } from "next-intl";
import ProductCard from "../Card/ProductCard";
import { use } from "react";
import { ProductsListType } from "@/schemas/productsList.schema";

interface Props {
  productsPromise: Promise<ProductsListType>;
}

export default function Products({ productsPromise }: Props) {
  const products = use(productsPromise);
  const t = useTranslations("products");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.products_connection.nodes.map((product) => (
        <ProductCard key={product.documentId} product={product} />
      ))}
    </div>
  );
}
