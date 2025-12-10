import { useTranslations } from "next-intl";
import ProductCard from "@/components/Card/ProductCard";
import { ProductType } from "@/schemas/product.schema";

export const FeaturedSelection = ({ featuredProducts }: Props) => {
  const t = useTranslations("featured");

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Playfair']">
            {t("title")}
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex not-md:flex-col items-center justify-center gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.documentId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Props {
  featuredProducts: ProductType[];
}
