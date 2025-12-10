import { Link } from "@/i18n/navigation";
import { CategoryType } from "@/schemas/categories.schema";
import { useTranslations } from "next-intl";

interface Props {
  categories: CategoryType[];
}

export default function Categories({ categories }: Props) {
  const t = useTranslations("categories");

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-3 ">
            {t("title")}
          </h2>
          <p className="font-inter text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex not-md:flex-col gap-4 mx-auto justify-center">
          {categories.map((category) => (
            <Link
              href={{
                pathname: "/products",
                query: { categories: category.title },
              }}
              key={category.title}
              className="rounded-sm bg-card min-w-[168px] text-accent shadow-sm hover:shadow-lg transition-all cursor-pointer hover:scale-105 border border-gray-100"
            >
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <img
                  src={category.icon.url}
                  alt={category.title}
                  width={48}
                  height={48}
                  className="text-accent mb-3"
                />
                <h3 className="font-inter font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
