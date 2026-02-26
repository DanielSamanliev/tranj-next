"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./DotNav";
import clsx from "clsx";
import { ArrowButton, usePrevNextButtons } from "./CarouselButton";

interface Props {
  slides: { id: string; content: React.ReactNode }[];
  breakpoints?: EmblaOptionsType["breakpoints"];
  basis?: string;
}

export default function Carousel({
  slides,
  breakpoints,
  basis = "basis-[100%] md:basis-1/2 lg:basis-1/3",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "end",
    skipSnaps: false,
    breakpoints: breakpoints,
  });
  const { selectedIndex, scrollSnaps } = useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative">
      <div className="flex gap-6 items-center">
        <ArrowButton
          aria-label="previous"
          className="rotate-180 not-md:hidden"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={clsx("grow-0 shrink-0 min-w-0 pl-4", basis)}
              >
                {slide.content}
              </div>
            ))}
          </div>
        </div>

        <ArrowButton
          aria-label="next"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="not-md:hidden"
        />
      </div>

      <div className="mt-4">
        <div className="flex md:hidden justify-center items-center gap-1.5">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-secondary w-6"
                  : "bg-secondary/40 w-1.5",
              )}
            />
          ))}
        </div>

        {/* <div className="hidden md:flex gap-6 justify-center items-center mt-4">
          <ArrowButton
            aria-label="previous"
            className="rotate-180"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <ArrowButton
            aria-label="next"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div> */}
      </div>
    </div>
  );
}
