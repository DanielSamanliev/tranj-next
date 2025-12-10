"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@heroui/button";

export default function ViewDetails({
  slug,
  label,
}: {
  slug: string;
  label?: string;
}) {
  return (
    <Button
      variant="solid"
      as={Link}
      href={`/product/${slug}`}
      className="rounded-xs bg-primary text-secondary-foreground font-semibold px-4 py-2 transition-transform hover:bg-primary/90"
    >
      <span className="backface-hidden">{label || "View Details"}</span>
    </Button>
  );
}
