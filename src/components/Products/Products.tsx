import { ProductType } from "@/schemas/product.schema";
import { useTranslations } from "next-intl";
import ProductCard from "../Card/ProductCard";

interface Props {
  products: ProductType[];
}

export default function Products({ products }: Props) {
  const t = useTranslations("products");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.documentId} product={product} />
      ))}
    </div>
  );
}
