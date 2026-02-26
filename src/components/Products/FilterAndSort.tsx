"use client";

import { CategoriesType } from "@/schemas/categories.schema";
import { productsSearchParams } from "@/searchParams";
import { Select, SelectItem } from "@heroui/select";
import { ArrowDownUp, Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { use } from "react";

interface Props {
  categoriesPromise: Promise<CategoriesType>;
}

export default function FilterAndSort({ categoriesPromise }: Props) {
  const { categories } = use(categoriesPromise);
  const t = useTranslations("products");
  const [categoryFilter, setCategoryFilter] = useQueryState(
    "categories",
    productsSearchParams.categories,
  );
  const [sortBy, setSortBy] = useQueryState("sort", productsSearchParams.sort);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8">
      <Select
        selectedKeys={new Set(categoryFilter)}
        selectionMode="multiple"
        isClearable
        label={t("filterByCategory")}
        placeholder={t("all")}
        variant="bordered"
        onSelectionChange={(keys) =>
          setCategoryFilter(Array.from(keys) as string[])
        }
        radius="none"
        classNames={{ listbox: "text-foreground" }}
        labelPlacement="outside"
        startContent={<Filter size={20} className="text-foreground" />}
      >
        {categories.map((category) => (
          <SelectItem
            startContent={
              <img
                src={category.icon.url}
                width={20}
                height={20}
                alt={category.title}
              />
            }
            key={category.title}
          >
            {category.title}
          </SelectItem>
        ))}
      </Select>

      <Select
        selectedKeys={sortBy ? new Set([sortBy]) : new Set()}
        onSelectionChange={(key) => setSortBy(key.currentKey ?? null)}
        isClearable
        label="Sort by Price"
        variant="bordered"
        radius="none"
        placeholder={t("sortPlaceholder")}
        classNames={{ listbox: "text-foreground" }}
        labelPlacement="outside"
        startContent={<ArrowDownUp size={20} className="text-foreground" />}
      >
        <SelectItem key="price:asc">{t("price:asc")}</SelectItem>
        <SelectItem key="price:desc">{t("price:desc")}</SelectItem>
      </Select>
    </div>
  );
}
