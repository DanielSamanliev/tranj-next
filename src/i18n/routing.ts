import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg"],
  defaultLocale: "bg",
  localePrefix: "as-needed",
  pathnames: {
    // internal keys MUST start with `/`
    "/": "/",
    "/about": { en: "/about", bg: "/за-нас" },
    "/products": { en: "/products", bg: "/продукти" },
    "/contacts": { en: "/contacts", bg: "/контакти" },
    "/ask-the-butcher": { en: "/ask-the-butcher", bg: "/попитай-майстора" },

    // dynamic routes: use [param] in the key
    "/product/[slug]": { en: "/product/[slug]", bg: "/продукт/[slug]" },
  },
});
