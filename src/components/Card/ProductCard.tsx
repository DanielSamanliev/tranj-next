import { Link } from "@/i18n/navigation";
import { ProductType } from "@/schemas/product.schema";
import { bgnToEur } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ViewDetails from "./ViewDetails";

export default function ProductCard({ product }: Props) {
  const tCommon = useTranslations("common");

  const slug = product.title.toLocaleLowerCase().replace(/\s+/g, "-");

  return (
    <div className="rounded-xs max-w-[400px] border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Link
        href={{
          pathname: "/product/[slug]",
          params: {
            slug: slug,
          },
        }}
      >
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image.url || ""}
            alt={product.title || "Product Image"}
            width={400}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-6 ">
        <div>
          <div className="font-[Playfair] text-3xl font-bold text-foreground mb-2">
            {product.title || "Product Name"}
          </div>
          {product.description ? (
            <p className="text-muted-foreground mb-4">{product.description}</p>
          ) : (
            <p className="mb-4 text-card">No description available.</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-accent">
            <div>
              {product.price.toFixed(2)} {tCommon("bgn")}/{tCommon("kg")}
            </div>{" "}
            <div>
              {bgnToEur(product.price).toFixed(2)} €/{tCommon("kg")}
            </div>
          </div>
          <ViewDetails slug={slug} label={tCommon("viewDetails")} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  product: ProductType;
}
