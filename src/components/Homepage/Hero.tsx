import { Link } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { getImageProps } from "next/image";
import ViewProducts from "./ViewProducts";

export const Hero = () => {
  const t = useTranslations("hero");

  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    height: 1080,
    width: 1920,
    src: "/images/hero-image.jpeg",
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { height: "800px", width: "100vw", backgroundImage };

  return (
    <section className="relative not-md:py-12 xl:h-[600px] 2xl:h-[800px] @lg:max-w-lg flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={style}>
        <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-primary-foreground mb-4 font-['Playfair']">
          {t("title")}
        </h1>
        <p className="font-['Inter'] text-xl md:text-2xl text-primary-foreground/90 mb-8 font-medium">
          {t("subtitle")}
        </p>
        <ViewProducts />
      </div>
    </section>
  );
};

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}
